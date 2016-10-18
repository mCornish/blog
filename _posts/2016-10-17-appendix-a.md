---
layout: post
appendix: A
title: "Building APIs"
subtitle: "Lessons From Building Express APIs"
image: "/images/appendix-a.jpg"
excerpt: "I owe most of my ability as a web developer to bloggers who share their knowledge and experiences. You might wonder why someone would offer valuable information freely, but I’ve found that everyone benefits from sharing information, including the person doing the sharing."
tags:
  - Appendix
  - API
  - Deployment
  - Development
  - ExpressJS
  - Backend
  - Heroku
  - MongoDB
  - Yarn
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">A4: Self-reflection helps you keep doing the good things and get rid of the bad things. That&#39;s blogging for me.<a href="https://twitter.com/hashtag/CodeNewbie?src=hash">#CodeNewbie</a> <a href="https://t.co/iCmLVkvBuT">https://t.co/iCmLVkvBuT</a></p>&mdash; Mike Cornish (@MikeWCornish) <a href="https://twitter.com/MikeWCornish/status/786382898807107584">October 13, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I owe most of my ability as a web developer to bloggers who share their knowledge and experiences. You might wonder why someone would offer valuable information freely, but I’ve found that everyone benefits from sharing information, including the person doing the sharing. 

In order to articulate a process or experience, you have to review it in your mind. You have to remember, organize, and filter it so that it makes sense and is useful to other people. That’s why I want to start writing about the things that I build. Yes, I absolutely want other developers to benefit from my experiences, but I'll get a lot out of it as well.

This is the first in a series of “appendices” which will detail the lessons I learn while working on different projects. I’ve already written a couple of these types of blog posts ([here](https://medium.com/@MikeCornish/what-i-learned-while-creating-an-animated-chart-with-d3-js-f4882b79914c#.jksvcdqxg) and [here](https://medium.com/@MikeCornish/im-currently-working-my-way-through-the-free-code-camp-assignments-and-i-recently-completed-one-cd086f637e3a#.qvyu3qh7j)), but now I’m ready to make it official. Let’s get this started!


## Topics
1. [Overview](#overview)
2. [Yarn](#yarn)
3. [ExpressJS](#express)
4. [MongoDB](#mongo)
5. [Heroku](#heroku)

<span id="overview"></span>

## Overview
I’m going to be detailing the lessons I learned while completing 5 API projects from the [Free Code Camp](https://www.freecodecamp.com) curriculum. These included building microservices for converting timestamps to dates, parsing request headers, shortening URLs, returning Google image search results, and returning metadata from an uploaded file. Most of the end results are fairly useless, but the process of building them was a fantastic learning experience.

The basic process for each project was the same: Set up with npm/Yarn, create endpoints with Express, manage data with Mongo (if necessary), and deploy to Heroku. After determining that basic process, all of the projects became much easier; I even completed a couple of them on the same day. It took some time to get to that point, though. Here are some reasons why.

You can view the final products in these repositories:

[Timestamp](https://github.com/mCornish/timestamp)

[Header Parser](https://github.com/mCornish/header-parser)

[URL Shortener](https://github.com/mCornish/url-shorterner)

[Image Search](https://github.com/mCornish/image-search)

[File Metadata](https://github.com/mCornish/file-metadata)

<span id="yarn"></span>

## Yarn
While I was working on these projects, Facebook announced the release of [Yarn](https://yarnpkg.com/), a major competitor for npm’s spot as king (queen?) of package management. I won’t pretend to be an expert on the subject, but I do appreciate the waves the announcement made in the community. My Twitter feed was absolutely tangled with Yarn on release day. It’s the first time I’ve seen something affect so much of the web development community in such a dramatic way.

For someone like me, who never got deep into npm, it’s easy to equate Yarn with a new syntax for npm; the syntax is the biggest change I’ve noticed so far. 

“Oh, so now it’s **add** instead of **install**. That’s confus—I mean, that’s nice.” 

It's obvious that Yarn is much more than a new syntax, but I won’t pretend to be as affected as more advanced developers. Even after reading [Facebook’s explanation](https://code.facebook.com/posts/1840075619545360/yarn-a-new-package-manager-for-javascript/) of why Yarn exists, I can still only muster so much excitement. All the same, I look forward to seeing how the community adapts and whether npm responds.

### Yarn Resources

[Yarn Official Website](https://yarnpkg.com/)

[Facebook Announcement](https://code.facebook.com/posts/1840075619545360/yarn-a-new-package-manager-for-javascript/)

<span id="express"></span>

## ExpressJS
I used Express years ago, back when I was first exposed to web apps. Back then, I only used it for routing; I didn’t even know what APIs were. Now, after building several APIs with Express, I’m super interested in what kind of tasks I can simplify with APIs.

The [ExpressWorks](https://github.com/azat-co/expressworks) lessons were all I needed to get up and running with Express. It was tempting to skip over some of the lessons that seemed like I could just read and say, “Yeah, I understand that,” but I would highly advise actually taking the time to complete each lesson. There are some speedbumps I could have circumvented if I’d paid closer attention to ExpressWorks.

Speaking of speedbumps: I encountered an annoying issue where I would receive a request from the /favicon.ico route every time I refreshed my page. A Google search revealed that this is a somewhat common issue with Express that can be remedied with a one-liner:

    app.use(‘/favicon.ico, res => res.sendStatus(200));

Even though Express is an amazing tool that is used all over the place, I don’t have much else to say. It’s satisfyingly straightforward (at least in terms of building APIs) and you can learn everything you need by completing ExpressWorks, then referencing [Express's documentation](http://expressjs.com/en/api.html) when you need it.

### ExpressJS Resources

[ExpressWorks](https://github.com/azat-co/expressworks)

[Express API Reference](http://expressjs.com/en/api.html)

<span id="mongo"></span>

## MongoDB
I’ve used Mongo quite a bit for web app development. However, the bulk of my experience comes from using it with MeteorJS, where it is somewhat abstracted. Setting up a project from scratch to use Mongo with Express was a very different experience from using it with Meteor.

[This tutorial](https://gist.github.com/iksose/9401758) was very helpful in getting me off the ground. For me, the most complicated part was figuring out the best way to connect to Mongo in relation to calling my API functions. Ultimately, I connected in index.js and set my endpoints in the callback function, passing in a database object to my API functions:

    MongoClient.connect(MONGO_URL, (err, db) => {
        if (err) {
            console.log("Unable to connect to Mongo.");
            process.exit(1);
        } else {
            app.get('/foo', fooFunc.bind(null, db));
            app.get('/bar', barFunc.bind(null, db));

            app.listen(app.get('port'), () => {
                console.log('Node app is running on port', app.get('port'));
            });
        }
    });

After that, the next big problem was deployment. I used mLab to host my database. Once you create a new database in mLab, you are provided with a URL through which to connect to your database. Simple, right? Not quite. The URL includes a username and password, which you’ll obviously want to keep secret. So, you need your code to use a URL without actually containing the URL. The solution? Environment variables:

    # On Mac/Linux
    export MONGOLAB_URI=“mongodb://username:password@foo123.mlab.com:1234/foobardb”

[This guide](https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Using-MongoDB-And-Deploying-To-Heroku) covers everything I needed to know, but I missed one detail: When you set an environment variable in a terminal, you have to use the same terminal window to start your server and use the variable. Since I'm generally using at least two different terminal instances at any given time, this was a huge pain for me. Twice, I sat pulling out my hair as I tried to figure out why index.js couldn't find my MONGOLAB_URI variable. The devil’s in the details.

With my environment variable working locally, all I had to do was push to Heroku and set my environment variable there. This gave me about an hour of trouble because I set the variable to MONGLAB_URL instead of MONGOLAB_URI. Those details—they’ll cost you a lot of time if you’re not careful.

### MongoDB Resources
[Creating a REST API using Mongo](https://gist.github.com/iksose/9401758)

[Deploying MongoDB to Heroku](https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Using-MongoDB-And-Deploying-To-Heroku)

<span id="heroku"></span>

## Heroku
A few years ago, I used [Heroku](https://www.heroku.com/) to deploy my first ever web app. I don’t remember much about that experience, but I do remember feeling slight trepidation at the idea of using Heroku again. Maybe I had difficulties using the CLI, or maybe I just associate Heroku with the frustrations of building my first app. In any case, I was surprised to find that Heroku was a joy to work with on these API projects. I highly recommend it for deploying node apps.

I set up my projects to deploy automatically after I pushed to Github, which made the process super simple. It’s all intuitive, fast, and, best of all, free ([kind of](https://www.heroku.com/pricing?c=70130000001xDpdAAE&gclid=CjwKEAjw7ZHABRCTr_DV4_ejvgQSJACr-YcwEIGBF2rwo_3KjpWLKVCzBJ7rLak2I9R5U1a1dyrMbBoCaHXw_wcB)).

I wish I could share some Heroku pro tips, but I didn’t have to mess with it too much. Be sure to check your logs if you run into any difficulties. Beyond that, you should be able to figure everything out through the [official documentation](https://devcenter.heroku.com/categories/nodejs).
