---
title: We're Back with Updates
date: 2016-02-11 16:09 UTC
author: scott
tags: Updates, Our Vision
---

It’s been awhile since our last post, but we’ve been hard at work and have a lot of updates to share with you. Our last post was in December and a lot has changed. This post is an overview of those changes.

## Prepping for a Production Product
The majority of the last two months has actually been spent soul searching.

Up to this point, Nanobox consisted of two separate and distinct projects: Nanobox Desktop and Nanobox Cloud. This structure never felt right to us. In our minds, these are really two parts of the same project; one for the development phase of an application, and one for the production phase of an application. To better align with our vision of what Nanobox is, we’re restructuring the project.

### Nanobox
From the outside, Nanobox will no longer be two projects. Nanobox is a service that enables you to build, manage, and scale infrastructures on your cloud provider of choice. It includes a local development tool that creates a virtual local environment using the exact same runtimes and configuration that will be used in your production environment.

The effects of this restructure trickle down through the Nanobox CLI and the structure of nanobox.io.

### Nanobox Dev - A Significant Change to the Nanobox CLI
With two distinct Nanobox projects, we were at a loss as to how we should structure our CLI. Having separate CLIs for each project didn’t feel right, but how do we structure a CLI for two distinct interactions: local and production? Burying production tools behind local development tools felt out of place too.

In the end, we realized the end goal of any application is to run in production. Local development is an important step in that process. We came to the decision that there needed to be a single Nanobox CLI with commands that focus on interacting with a production app. And within the CLI, there should be a subset of commands designed to provision and manage local virtual development environments.

To that end, the `dev` sub-command now houses the functionality that, up to this point, Nanobox is known for; creating and managing a local development VM. The majority of commands used in previous versions of the Nanobox CLI are now nested under the `dev` sub-command. For example:

```bash
$ nanobox dev
# Starts the Nanobox VM, provisions your app,
# and drops you into an interactive console

$ nanobox dev info
# Displays information about your Nanobox VM
# and running app

$ nanobox dev console
# Opens an interactive terminal from inside
# your app on the Nanobox VM
```

There are identical commands using the base `nanobox` command, that will interact with your future production Nanobox app(s).

#### These Updates are Currently in Testing
Since the changes are so significant, they haven’t been added to the stable Nanobox release, but are being tested in our dev release. We expect to merge the updates into the stable release by the end of the month. If you want to help test the bleeding-edge version of the Nanobox CLI, you can do the following:

1. Copy your nanobox executable
2. Rename your copied nanobox executable to “nanobox-dev”
3. Run an update using the nanobox-dev executable: `nanobox-dev update`
4. Test the `dev` subcommands with `nanobox-dev dev`

You can view the changelog [here](https://github.com/nanobox-io/nanobox/blob/master/CHANGELOG.md).

### Site Restructure
The restructuring of the Nanobox project has necessitated some minor tweaks to the Nanobox family of sites. Some already exist and others are on their way. Here’s a quick overview:

- **nanobox.io** - The landing site for Nanobox
- **dev.nanobox.io** - A micro-site that will highlight the local development functionality provided by the `nanobox dev` subcommand.
- **docs.nanobox.io** - Documentation for Nanobox
- **shelf.nanobox.io** - (*Name Pending*) A catalog of engines, services, quickstarts, and boxfiles usable on Nanobox. More on this next week.
- **dashboard.nanobox.io** - The dashboard for managing production apps with Nanobox.

## Custom Services
Since the beginning, Nanobox was designed to allow for custom engines, giving you the ability to fully customize your code’s runtime environment. We’re excited to announce that in the near future, you’ll be able to do the exact same thing with data services. This will allow you to custom build your own PostgreSQL database, Redis service, or your very own open-source queueing engine. It’s totally up to you!

More information will be coming in the future. We’re excited to let you have full control over every aspect of your application’s infrastructure.
