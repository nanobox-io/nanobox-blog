---
title: This Week in Nanobox
date: 2015-10-30 22:38 UTC
author: domino
tags: Updates
---

This week we've added some cool new features to [Nanobox Desktop](https://desktop.nanobox.io) and have resolved a few issues.

#### New Features:
- Nanobox now generates dynamic SSH ports allowing you to now run multiple nanoboxes at the same time *(awesome)*.
- The way nanobox generates the dynamic IP for its private network is much smarter and greatly reduces the likelihood of conflicting IP’s.

#### Resolved Issues:
- The `vagrant.log` and `server.log` are now correctly generated inside the 'app' folder (`~.nanobox/apps/<app-name>`).
- An issue causing the VM to continuously suspend after a 'nanobox reload' has been resolved.
- Fixed a race condition where nanobox was attempting to kill the docker DHCP server before it was available to kill, causing the VM to freeze.
- Fixed an issue where nanobox was 'ping flooding' the server causing the server to die and the client (nanobox) to suspend the VM.

## Whats Next for Nanobox?
### Overlays
The next big thing on our feature list is support for “overlays”; a quick way to combine functionality from different engines.

The way an overlay works is it takes a list of [engines](https://docs.nanobox.io/engines/) and overlays their functionality (files). For example, a Ruby on Rails (RoR) engine would overlay the NodeJS and Ruby engines with it's own functionality. These overlays would allow the RoR engine to use things like Ruby and Bower.js without having to add them explicitly into the engine.

This way, when there are updates to an overlay’d engine, the engine itself wouldn’t need to be updated. For example, if the PHP engine is updated, the Wordpress engine, which includes the PHP engine as an overlay, wouldn't need to pull in those updates. It would simply get the updates once it's compiled.

### Upcoming Events
Nanobox will be presenting at the "NodeJS Ninjas" meetup group in SLC on Nov 18th at 6:00pm. Details can be found [here](http://www.meetup.com/utahnodejs/events/226098953/).