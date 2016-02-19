---
title: Our Move Away from “Zero-Config”
date: 2016-02-19 20:20 UTC
author: scott
tags: Features, Updates
---

In our initial [vision of Nanobox](/the-vision-of-nanobox/), our hope was to create a system that would scan your codebase and auto-detect/auto-configure what it needed to run. While this level automation sounds great on paper, we found that it feels too magical for most. Initial feedback was that it felt like control was taken away, and we totally understand. This helped us to realize that, moving forward, we need to put more control of the process into your hands.

To help conceptualize what we feel Nanobox needs to be, we’ve studied LEGO to see what makes them so popular.

### The LEGO Metaphor
Legos tapped into my love of creating; bringing something into existence that didn’t exist before. It’s that same love and passion led me to where I am today and I’m betting that, on some level, it’s the same for you.

What made LEGO so great was that rather than giving me a pre-built, glued-together pirate ship, they gave me all the pieces I needed to build a pirate ship. The set came with directions, but I didn’t have to follow them. I could do whatever I wanted and I loved the creative freedom.

We’ve placed LEGO on a spectrum consisting of 3 parts: A pre-built pirate ship, LEGO blocks, and a block of wood.

<img style="display: block; max-width: 665px; margin: 0 auto;" src="/images/lego-spectrum.svg">

We’ll start with the opposite ends of the spectrum:

#### The Pirate Ship
It’s a pirate ship. It’s cool, but you have no say in how it’s designed or built. It is what it is and there’s not much you can do to change it.

*Development Parallel*: A pre-defined solution that works, but may not be exactly what you want or need. I won’t say the original direction of Nanobox was all the way at this end of the spectrum, but it was getting close.

#### The Wood Block
You can create pretty much anything out of this wood block, but it will be time-consuming and difficult.

*Development Parallel*: Building an infrastructure from scratch. It’s possible, but time-consuming, difficult, and can require expertise you may not have.

#### Legos
LEGO provides building blocks that can be used to build just about anything. They come in different shapes and sizes, but they follow standards and patterns that allow them to all work together.

*Development Parallel*: Nanobox. This is what we aim to provide: a system in which all the necessary “building blocks” are available in the form of engines and services, but you put them together how you’d like. These “blocks” follow standards and patterns so they work together, but the tedium is eliminated. You’re given the pieces necessary to build your vision.


## Changes to Nanobox
With this shift in thinking, we’re implementing changes to give you more control.

### Emphasis on the Boxfile
The Boxfile is a simple yaml config file that defines what services and configuration your app needs to run. Up to this point, Boxfiles have been optional since engines have carried the weight of assuming your app’s needs.

Engines no longer make assumptions about the needs of your app (more on that below). Boxfiles now carry the full weight of app configuration, letting you to explicitly define your app’s needs. Because of this shift, *Boxfiles are now required*.

Using the LEGO metaphor, the Boxfile is where you tell Nanobox what blocks you need and how they should fit together.

### Simplified Engines
By shifting the burden of configuration into the Boxfile, engines have been greatly simplified. The original scope of engines included scripts that would “sniff” your codebase and auto-detect the needs of your app. The sniff process, while cool, wasn’t fool-proof and required a lot of upfront work by engine developers to get it to work properly.

Engines will no longer try to auto-detect the needs of applications other than the primary runtime. All services and configuration will be specified in your Boxfile.

#### No More Overlays
We know this was a short-lived feature, but with the new structure of engines, overlays are no longer necessary or feasible. The original purpose of overlays was to easily layer the functionality of multiple engines into one, removing the need to duplicate auto-detection and code configuration. With the reduction of engine auto-detection capabilities, this is no longer necessary.

Another reason overlays are being removed is because we’re changing how engines are stored. Previously, engines had to be published to and hosted on Nanobox in order to be used. Now, engines will be hosted elsewhere, such as Github. Overlays will not work with this setup.

#### No More Enginefiles
Enginefiles existed only to allow engines to be published to Nanobox. Since the need for publishing has been removed, enginefiles are no longer necessary.

### The Registry
The Registry (*name pending*) will be a searchable catalog of engines, services, Boxfiles, and quickstarts (codebases pre-populated with a boxfile). Anybody can create engines and services and add them to the registry, allowing you to find and use them. You can also share Boxfiles built for specific frameworks, making it easy to share and see what others have done to get apps running. To go back to the LEGO metaphor, this will be your bucket of blocks.

## Gearing Up for a Production Offering
As mentioned in our [last post](/we-re-back-with-updates/), everything we’ve done over that last few months has been in preparation for a production offering. We’re getting really close to a private beta and would love some help. If you’re interested in being a part of the Nanobox beta, go to [nanobox.io](https://nanobox.io) and click “Sign up for the Private Beta”.

Thanks for the support. You’re awesome!
