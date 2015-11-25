---
title: Thanksgiving Update
date: 2015-11-25 18:49 UTC
author: scott
tags: Updates
---

Tomorrow is Thanksgiving here in the U.S. and we just wanted to give you a quick update on the progress we’ve made over the last week. Due to [Nanobox and Nanopack projects trending on Hacker News and Github](/3-projects-in-2-days-trend-on-hacker-news-github/), progress on these projects has sped up considerably; in large part due to the contributions from you, the community, in the form of issues and pull requests. Thank you so much and keep them coming!

## ***Important:*** Broken Update Command
Just as the word began to spread about Nanobox, we found a bug in the Nanobox updater that prevented it from working correctly. This bug was in v0.16.8 and has now been fixed. However, because it was in the updater, if you’re currently running v0.16.8, the `update` command can’t be used to pull the fix in. To check which version you have installed, run:

```bash
$ nanobox -v
```

If you are currently running 0.16.8, you’ll need to download and re-install the most recent version of the Nanobox binary (found on our [downloads page](https://desktop.nanobox.io/downloads/)). Once installed, run the following commands in each of your Nanobox apps to ensure everything is up to date.

```bash
$ nanobox update
$ nanobox reload
$ nanobox update-images
$ nanobox dev --rebuild
```

## Engine Updates Galore
We’ve been hard at work creating and updating engines to expand the library of languages and frameworks. We’ve been *happily* overwhelmed with issue submissions, bug-fixing pull requests, and community members volunteering time & knowledge to help build fully-functional engines.

If you’d like to help contribute to an engine, we’ve posted a list of questions in each to help identify exactly what the engine needs. We’ve already received some much appreciated feedback, but would love more. Here’s links to the Github issues that house the list of questions for each project:

[Python](https://github.com/nanobox-io/nanobox-engine-python/issues/4)  
[Django](https://github.com/nanobox-io/nanobox-engine-django/issues/1)  
[Go](https://github.com/nanobox-io/nanobox-engine-golang/issues/5)  
[Elixir](https://github.com/nanobox-io/nanobox-engine-elixir/issues/2)  [Java](https://github.com/nanobox-io/nanobox-engine-java/issues/5)  
[Scala](https://github.com/nanobox-io/nanobox-engine-scala/issues/2)  
[Clojure](https://github.com/nanobox-io/nanobox-engine-clojure/issues/1)  
[Node.js](https://github.com/nanobox-io/nanobox-engine-nodejs/issues/7)  
[Perl](https://github.com/nanobox-io/nanobox-engine-perl/issues/1)  
[C/C++](https://github.com/nanobox-io/nanobox-engine-c/issues/1)  

## Windows Compatibility
Most of the testing for Nanobox prior to this week was done in OSX and Linux, leaving significant bugs in the Windows version. Thanks to those of you using Windows and the issues/pull requests you’ve submitted, we’ve been able to iron out the majority of the issues that have prevented Nanobox from working properly in Windows. The remaining “deal-breaking” bugs should be resolved by early next week.

## Updated Installers
All Nanobox installers have been updated, with most of the effort going into the Linux installers. These updates fix issues discovered as the installers have been used across many different OSs and OS versions.

## Prepping Updated Packages for Nanobox pkgsrc
We’re in the process of preparing new packages to be included in the [Nanobox pkgsrc](http://pkgsrc.nanobox.io/nanobox/base/Linux/). These are packages/binaries available for use in engines. Updates will include newer versions of packages as well as minor/patch versions that fill in the gaps between existing minor/patch versions and should be available sometime next week.

## Updates to Nanopack Projects
After open-sourcing the [Nanopack projects](http://nanopack.io), we’ve received significant contributions to projects such as [Mist](https://github.com/nanopack/mist) and [Yoke](https://github.com/nanopack/yoke). These have helped to speed the development of each of these projects. Special thanks to [saromanov](https://github.com/saromanov), [hypersleep](https://github.com/hypersleep), [rhcarvalho](https://github.com/rhcarvalho), [nsorger](https://github.com/nsorger), [khink](https://github.com/khink), [feuersteinacc01](https://github.com/feuersteinacc01), [cvan](https://github.com/cvan), [jshawl](https://github.com/jshawl), and any others that have contributed that I may have missed. 

## Happy Thanksgiving
As tomorrow we’ll be celebrating Thanksgiving, for the rest of this week, our team will be spending time with our families. We’ll still likely respond to issues and pull requests (it’s hard for us to stay away), but responses may come slower than they have. For those of you who celebrate it, Happy Thanksgiving! Come Monday, we’ll be back with full stomachs and fresh minds.