---
title: Focus on Apps, Not Configuring Dev Environments
date: 2015-10-23 18:00 UTC
author: tyler
tags: Open Source
---

**TLDR:** Introducing a better local development workflow. Watch the Demo.

<div class="video" id="video-demo">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/TV4iBxytfyE?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>

##Declutter Workstations with a Better Workflow
We’re excited to announce the release of Nanobox Desktop, which automatically generates fully virtualized environments on your local workstation from a single command. Nanobox auto-detects the application type, provisions a virtual machine (VM), and creates all of the app’s related services inside the VM - all without complex manual configuration.

Under the hood, Nanobox uses [Virtualbox](https://www.virtualbox.org/) to create a VM for each app. It leverages [Vagrant](https://www.vagrantup.com) for VM creation and [Docker](https://www.docker.com/) to “containerize” processes inside the VM. By cleanly isolating application environments, apps with all their dependencies can be managed simply, without cruft or workstation configuration. 

##Tap into Community Expertise
We can’t know everything required to configure all virtual development environments. Instead, we provide simple tools that promote a community-driven collection of specialized Engines which install runtimes, detect dependencies, and compile your codebase. By default, Nanobox pulls from this [catalogue of community-contributed engines](https://engines.nanobox.io). Anyone can add and use custom Engines with minimal effort.

## You’re in Charge of the Automation
While automated configuration might sound a bit scary, Nanobox ensures that you’re always in control. Adding a [Boxfile](https://docs.nanobox.io/boxfile/) in the root of an application overrides or supplements the automated build. Boxfile configuration can be as simple as specifying a custom Engine or adding a Postgres service, or more complex, like choosing a specific Ruby runtime or enabling MySQL configuration settings.

Need more control? Create a custom Engine and auto-configure even the nit-pickiest of development environments. 

## Getting Started
Ultimately, you have to see it to believe it. You should check out the [video demo](#video-demo). If you’re too strapped for time to watch a 2 minute video, you’re spending too much time managing a cluttered local environment. [Download Nanobox](https://desktop.nanobox.io/downloads).

We’d love to get your feedback or answer additional questions, so hop into our [#nanobox IRC channel](https://webchat.freenode.net/?channels=nanobox) for a chat.