---
title: Yoke - Redundancy & Auto-Failover for PostgreSQL Clusters
date: 2015-10-09 22:15 UTC
author: scott
tags: Open Source
---

In this tutorial we will show how to setup Yoke, a primary/secondary Postgres streaming replication solution that we wrote to fit our workflow, not fail over too often, and still provide a high availability database. We have used Yoke in production for around a year, and are comfortable making it available to others. 

For purposes of this tutorial, we will be using a blank ubuntu machine and installing 3 Yoke processes on one server. In actual production, you MUST have three separate machines : two for the actual Postgres databases, and one to act as an arbiter for network partitions. By the end of this tutorial, you should be able to know how to install, configure, and setup everything needed for your own private, high availability postgresql cluster. 

## Background

###### TLDR
Mongo was ruining our lives. If it has ruined yours, skip straight to the configuration.

After running rails projects in production for several years without incident, we were pretty happy with Mongo. Last year we built a new Rails project, and to make sure that our environment was uniform, we upgraded all of our older Rails projects to the newest Rails version, which required updating our Mongo servers.

We had heard other companies trashing Mongo, but had never had any issues with it. We assumed there was just something we weren't doing, or something they were doing that was causing their pain. We pitied them.

Unfortunately it seemed that the newest *stable* mongo version had some major issues. In the course of a few months, we were plagued with disappearing data, data changing relationships with other data, memory leaks, and restoring backups scheduled to finish after the heat death of the universe.

To minimize data loss and corruption we compiled a list of things *not* to do with mongo:

#### Do not do these

- fail over to a different node
- fail back to the original primary
- not failing over
- have a node disconnect from the cluster
- have the cluster completely connected
- store data in the cluster
- remove data from the cluster
- connect to the monitor
- look at the cluster

Ok, that was a little exaggerated, but that is how it felt trying to manage the Mongo cluster. Every time something in our system caused an issue, we always tracked it to Mongo. We realized that we needed to switch, and switch fast! There was no way we could continue to use Mongo.

Postgresql was our only option, but we needed a cluster of machines that would provide high availability failover. Unfortunately, postgresql doesn't do that so well. There are a few projects that can be used in conjunction with PostgreSQL that will configure and create a high availability cluster, but they didn't really fit with our workflow, or they failed over too often. We wrote our own solution that had everything we needed, and still provided a high availability solution.

## Installation

Let’s get this system up and running! Starting with a blank install of ubuntu 14.04, we will need to install a few things.

First off is postgres. We are going to use the official packages from postresql.org for this installation. The sources don't exist by default in ubuntu, so the first step is to add the source, and the key for the source, so that it is trusted.

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

Now we can install Postgres. One of the oddities of this package is that it sets up a default Postgres that is running after the package is installed. Normally, that would be nice, but for Yoke we don't need it.

```bash
apt-get install postgresql-9.4
kill `pgrep postgres` # we don't need it running.
```

Now for yoke. Because yoke doesn't have any official packages available, we are going to need to install it from source. Which means that we need to install [Go](https://golang.org/) to compile it.

```bash
# download golang
wget https://storage.googleapis.com/golang/go1.5.1.linux-amd64.tar.gz

# install golang
tar -C /usr/local -xvf ./go1.5.1.linux-amd64.tar.gz

# make the go and postgres executable available in the path
export PATH=$PATH:/usr/local/go/bin:/usr/lib/postgresql/9.4/bin
```

You can verify that Go installed correctly by running `go version` and that the command is installed. Now that we can compile Yoke it is time to get it. We need the git command installed on the system so that go can install all the needed dependencies.
bash

```bash
# install git
apt-get install git
```

And now we can build Yoke! We just need to setup the GOPATH environment variable so that Go can correctly install and stage projects, and then we are good to go!

```bash
# setup the GOPATH so that go will work
cd ~
export GOPATH=`pwd`
cd -

# download yoke
go get github.com/nanobox-io/yoke

# install yoke
go install github.com/nanobox-io/yoke

# move it so that we can run it
sudo cp $GOPATH/bin/yoke /usr/bin/yoke
```

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

Now let’s startup Yoke and see what happens. We need 3 Yokes running so the cluster can exist correctly. Run each of the following commands in a separate terminal. You **MUST** be the postgres user to run these commands `sudo su postgres`.

```bash
yoke ./failover/1/pg.config
yoke ./failover/2/pg.config
yoke ./failover/3/pg.config
```

You can now turn off any one of the nodes and see how the cluster behaves.

When the primary is unavailable, the secondary gets promoted to new new primary. When the old primary comes back online, it will recognize there is already a primary running and will start up as a slave of the current primary.

When a secondary shuts off, the primary takes no action, as nothing needs to happen. When the secondary comes back online, the primary resyncs with the secondary and the cluster is back in operation.

The monitor going offline does not affect the cluster in any way.

## Summary

That’s it! You now have a complete cluster of PostgreSQL processes. 

In order to make this work as a production system there are three changes that need to be made.

the three yoke processes need to be installed on three different servers
the static ips in the config file need to be changed to the actual ips of the three servers
In order for failover to really work, the clients that connect to postgresql will need to be updated to know which one is the current master.
Yoke has the ability to run two different scripts, one when it becomes the master, and the other when it becomes the slave. We use Virtual Ips in our yoke clusters, however these may not be available on your hosting platform. Alternatives would be a dynamic DNS service, such as consul, or even etcd.

```bash
[vip]
  ip="1.2.3.4"
  add_command=echo I’m the master, you should replace this with a real command
  remove_command=echo I’m the slave, you should replace this with a real command
```
