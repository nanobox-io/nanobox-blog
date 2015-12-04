---
title: The Vision of Nanobox
date: 2015-12-04 21:08 UTC
author: tyler
tags: Our Vision
---

As Nanobox has received a lot of attention over the last few weeks, we have felt the need to externalize our vision for the future of Nanobox. 

**TLDR:** Three guiding principles in the development of Nanobox: zero configuration, team-based workflow, and intuitive infrastructure management.

## Our Target Users

Nanobox was designed to solve environment-specific problems for application developers. We realize not everyone will want or need to use Nanobox, and that’s ok. Specifically, we’re in the business of eliminating the overhead of environment setup and configuration from application developers. 

## Our Vision
Although Nanobox can be used in a variety of ways, all future development will be focused on providing application developers with a streamlined workflow through the following guiding principles:

### Zero Configuration
The ultimate goal of Nanobox is to make provisioning development and production environments as easy and seamless as possible. Nanobox will make opinionated, best-practice decisions on your behalf to setup your environment, leaving you to just write your application.

It can be a real challenge to build a local dev environment that matches (or even gets close to) your production environment. Configuration of each can be daunting. Nanobox aims to automate this process by both detecting the needs of your application, then provisioning and configuring your environment to suit.

The bulk of automation happens through [Engines](https://docs.nanobox.io/engines/). Engines are what “sniff” your app’s codebase and configure the environment to match your needs. The current library of engines is still in its infancy, but as more devs contribute new language engines and framework-specific engines, Nanobox’s ability to accurately detect and configure your environment will improve.

#### You’re Still in Control
We know the term “zero configuration” and the “magic” associated with automation scares some. While automation and a zero-configuration platform is our goal, know that you will always have the ability to custom-configure your environment through a [Boxfile](https://docs.nanobox.io/boxfile/) or through [building a custom engine](https://desktop.nanobox.io/engine-dev/).

### Team-Based Workflow
Adding a new developer to a project  typically involves a few hours, if not days, of getting their local workstation setup, granting access and permissions on all the necessary project dependencies, then troubleshooting the idiosyncrasies of their workstation. 

With Nanobox desktop, all that would be involved is granting the user access to the codebase, having them clone it to their local machine, then running `nanobox dev`. Everything the app needs to run is included in the repo. Once running, the environment is housed inside of an isolated Virtual Machine (VM) and is identical to any other collaborators’ running the same app using Nanobox.

This is just one example of how Nanobox hopes to streamline collaborative development. [Nanobox Cloud](https://nanobox.io/cloud/) will introduce a completely new team-based workflow for production apps. Stay tuned...

### Intuitive Management

With Nanobox Desktop, we’ve invested a large amount of time and effort into making the process as simple and intuitive as possible. A single command, ‘nanobox dev’, is the only requirement for building a fully-virtualized development environment. All decisions have been and will be heavily geared towards keeping the process simple. 

Again, keep your eye out for Nanobox Cloud. The release will introduce a new approach to managing production infrastructure. 

---

## Contributor Love
Today we’re starting what we’d like to be a weekly tradition. We just want to recognize and thank those who have contributed to Nanobox and Nanopack projects in the past week. We’ll try our best to mention everyone who has contributed, but we may miss some. If you have contributed and we’ve missed you, please know how grateful we are and we’ll try to get you in next week.

**[harobed](https://github.com/harobed)**  
• Helped to identify many issues in Nanobox  
• Helped to identify critical issues in the [Python Engine](https://engines.nanobox.io/releases/00d59bc3-7943-4082-97b8-44be36055f4b)  
• Provided a [sample Python app](https://github.com/nanobox-io/nanobox-python-sample) for testing the Python engine.  

**[mattn](https://github.com/mattn)**  
• Fixed an issue where Windows wasn’t properly checking if VirtualBox was installed.  

**[dsandstrom](https://github.com/dsandstrom)**  
• Identified a bug in the Nanobox CLI that prevented the `.ssh` directory from being mounted correctly.  
• Identified 404 pages on the Nanobox Desktop site.  

**[wdiechmann](https://github.com/wdiechmann)**  
• Helped to find a bug in the ruby engine that prevented data services in the Boxfile from being recognized.  

**[audieleon](https://github.com/audieleon)**  
• Helped to identify a bug where `nanobox dev` would fail if the user’s `.ssh` directory wasn’t in the user’s home directory.  
• Helped to identify a bug where `nanobox dev` fails if NFS and it’s dependencies are not installed on the user system.  

**[vahagnaharonian](https://github.com/vahagnaharonian)**  
• Fixed the password prompt in the Nanobox Mac installer


