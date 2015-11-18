---
title: Yoke - Redundancy & Auto-Failover for PostgreSQL Clusters
date: 2015-11-17 14:00 UTC
author: daniel
tags: Open Source
published: false
---

In this tutorial we will show how to setup Yoke, a primary/secondary Postgres streaming replication solution that we wrote to fit our workflow, not fail over too often, and still provide a high availability database (see Why we wrote this below). We have used Yoke in production for around a year, and are comfortable making it available to others. 

For purposes of this tutorial, we will be using a blank Ubuntu machine and installing three Yoke processes on one server. In actual production, you MUST have three separate machines : two for the actual Postgres databases, and one to act as an arbiter for network partitions. By the end of this tutorial, you should be able to know how to install, configure, and setup everything needed for your own private, high-availability postgresql cluster. 

## Background

###### TLDR
Mongo was ruining our lives. If it has ruined yours, skip straight to the configuration.

After running rails projects in production for several years without incident, we were pretty happy with Mongo. Last year we built a new Rails project, and to make sure that our environment was uniform, we upgraded all of our older Rails projects to the newest Rails version, which required updating our Mongo servers.

We had heard other companies trashing Mongo, but had never had any issues with it. We assumed there was just something we weren't doing, or something they were doing that was causing their pain. We pitied them.

Unfortunately it seemed that the newest “stable” Mongo version had some major issues. In the course of a few months, we were plagued with disappearing data, data changing relationships with other data, memory leaks, and restoring backups scheduled to finish after the heat death of the universe.

To minimize data loss and corruption we compiled a list of things *not* to do with Mongo:

**Do not do these**  
  - Fail over to a different node  
  - Fail back to the original primary  
  - Not failing over  
  - Have a node disconnect from the cluster  
  - Have the cluster completely connected  
  - Store data in the cluster  
  - Remove data from the cluster  
  - Connect to the monitor  
  - Look at the cluster  

Ok, that was a little exaggerated, but that is how it felt trying to manage the Mongo cluster. Every time something in our system caused an issue, we always tracked it to Mongo. We realized we needed to switch, and switch fast! There was no way we could continue to use Mongo and PostgreSQL proved our best alternative.

## Why Yoke Instead of Other Solutions
While we knew PostgreSQL was our preferred replacement for Mongo, we required a cluster of machines for high-availability failover. Additionally, we needed the same management benefits from our previous system, including automatic failover and recovery in a solid, replicated system, without requiring more than 3 nodes. Unfortunately, Postgres doesn't handle that so well. There was no built-in way of *automatically* managing node failover.

We looked into several tools, including [Postgres-XC](https://wiki.postgresql.org/wiki/Postgres-XC) and [Repmgr](http://www.repmgr.org/). Unfortunately, we found that while they were promising and highly recommended, existing projects either required manual intervention on failover, suffered from Shoot-The-Other-Node-In-The-Head (STONITH) issues, removed Postgres functionality, failed-over too often, or required more than 3 nodes. So we wrote Yoke to include everything we needed for a high availability PostgreSQL cluster that’s simple to management.


## Install Ubuntu, PostgreSQL, Yoke & Golang

Let’s get this system up and running! Starting with a blank install of Ubuntu 14.04, we will need to install a few things.

First off is Postgres. We are going to use the official packages from [postresql.org](http://www.postgresql.org) for this installation. The sources don't exist by default in Ubuntu, so the first step is to add the source and the key for the source, so that it is trusted.

This all done under the `sudo -i` command to avoid any permission issues.

```bash
sudo -i
# add the postgres sources to our apt-list
echo deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main >> /etc/apt/sources.list.d/pgdg.list

# add the source key so that it is trusted on our machine
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# update so that we can use the postgres packages
apt-get update
```

#### Install Postgres

Now we can install Postgres. One of the oddities of this package is that it sets up a default Postgres that is running after the package is installed. Normally, that would be nice, but for Yoke we don't need it.

```bash
apt-get install postgresql-9.4
kill `pgrep postgres` # we don't need it running.
```

#### Install Go

Now for yoke. Because yoke doesn't have any official packages available (*yet*), we are going to need to install it from source. We need to install [Go](https://golang.org/) to compile it.

```bash
# download golang
wget https://storage.googleapis.com/golang/go1.5.1.linux-amd64.tar.gz

# install golang
tar -C /usr/local -xvf ./go1.5.1.linux-amd64.tar.gz

# make the go and postgres executable available in the path
export PATH=$PATH:/usr/local/go/bin:/usr/lib/postgresql/9.4/bin
```

You can verify that Go installed correctly by running `go version` and that the command is installed. Now that we can compile Yoke it is time to get it. We need the git command installed on the system so that go can install all the needed dependencies.

```bash
# install git
apt-get install git
```

#### Build Yoke

And now we can build Yoke! We just need to setup the GOPATH environment variable so that Go can correctly install and stage projects, and then we are good to go!

```bash
# setup the GOPATH so that go will work
cd ~
export GOPATH=`pwd`
cd -

# download yoke
$ go get github.com/nanobox-io/yoke

# install yoke
go install github.com/nanobox-io/yoke

# move it so that we can run it
sudo cp $GOPATH/bin/yoke /usr/bin/yoke
```

## Yoke Demo
At this point we have everything we need to run Yoke on a Postgres cluster and have failover between the system nodes.

Again, for purposes of the demo, we’ll do the setup on one node, so let’s create a few folders and files to get everything setup. This command will setup three subfolders that have a Yoke config file, a Postgres database installed, and everything needed to get a cluster up and running. We will be doing this as the Postgres user so that everything has the proper permissions.

**Note:** This is how to get a cluster running on a single node, in production you **MUST** have three separate machines, two for the actual postgres databases, and one to act as an arbiter for network partitions.

```bash
# become the postgres user
su postgres
cd ~

# ensure that the postgres user can access the postgres executable
echo 'export PATH=$PATH:/usr/lib/postgresql/9.4/bin' >> ~/.bashrc

# load the PATH into the current session so that we can access the executables
export PATH=$PATH:/usr/lib/postgresql/9.4/bin

# create 3 nodes, primary, secondary, monitor
for PAIR in 1:primary 2:secondary 3:monitor; do
  IFS=':' read -r ID ROLE <<< $PAIR
  mkdir -p /var/lib/postgresql/failover/$ID/data
  # build the config file
  cat > /var/lib/postgresql/failover/$ID/pg.config <<EOF 
[config]
  advertise_ip=127.0.0.1
  advertise_port=440$ID
  data_dir=/var/lib/postgresql/failover/$ID/data
  status_dir=/var/lib/postgresql/failover/$ID
  pg_port=543$ID
  role=$ROLE
  peers=127.0.0.1:4401,127.0.0.1:4402,127.0.0.1:4403
  monitor=127.0.0.1:4403
  primary=127.0.0.1:4401
  secondary=127.0.0.1:4402
  sync_command=rsync -a --delete {{local_dir}} {{slave_dir}}
EOF
  # initialize a blank postgresql database
  initdb -D /var/lib/postgresql/failover/$ID/data
done
```

Now let’s startup Yoke and see what happens. We need 3 Yokes running so the cluster can exist correctly. Run each of the following commands in a separate terminal. You **MUST** be the Postgres user to run these commands `sudo su postgres`.

```bash
yoke ./failover/1/pg.config
yoke ./failover/2/pg.config
yoke ./failover/3/pg.config
```

You can now turn off any one of the nodes and see how the cluster behaves.

## How Yoke Failover Works

When the primary is unavailable, the secondary gets promoted to the new primary. When the old primary comes back online, it will recognize there is already a primary running and will start up as a slave of the current primary.

When a secondary shuts off, the primary takes no action, as nothing needs to happen. When the secondary comes back online, the primary resyncs with the secondary and the cluster is back in operation.

The monitor going offline does not affect the cluster in any way.

## Running Yoke in a Production Environment

That’s it! You now have a complete cluster of PostgreSQL processes. However, in order to make this work as a production system, there are three changes that need to be made.

The three yoke processes need to be installed on three different servers
The static IPs in the config file need to be changed to the actual IPs of the three servers
In order for failover to really work, the clients that connect to PostgreSQL will need to be updated to know which one is the current primary.

Yoke has the ability to run two different scripts, one when it becomes the primary, and the other when it becomes the secondary. We use Virtual Ips in our yoke clusters, however these may not be available on your hosting platform. Alternatives would be a dynamic DNS service, such as consul, or even etcd.

This is an example of the additional part of the yoke config file needed to properly fail over to the primary node. Please replace the `add_command` and the `remove_command` of this config file with commands that are appropriate for your setup.

```conf
[vip]
  ip="1.2.3.4"
  add_command=echo I’m the master, you should replace this with a real command
  remove_command=echo I’m the slave, you should replace this with a real command
```

