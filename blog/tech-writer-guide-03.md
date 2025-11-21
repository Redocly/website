---
template: ../@theme/templates/BlogPost
title: A tech writer's guide to the Redocly galaxy (part 3)
description: Introducting Redocly CLI and Redoc
seo:
  title: A tech writer's guide to the Redocly galaxy (part 3)
  description: Introducting Redocly CLI and Redoc
author: jody-winter
date: "2022-12-12"
categories:
  - redocly:redocly-cli
image: blog-8.jpg
---
# A tech writer's guide to the Redocly galaxy: Introducing Redocly CLI and Redoc

Now that you understand some basic concepts, this is a good time to get acquainted with our open-source tools: [Redocly CLI](https://redocly.com/redocly-cli/) and [Redoc](https://redocly.com/redoc/).

## Documentarians, meet your new best friends

Redocly CLI manages your complex API definition files in a multi-file format, applies linting (validation), and quickly bundles them up ready for publishing. Redoc previews then publishes files as straightforward, interactive documentation in a format that developers love. Both Redocly CLI and Redoc are highly configurable, feature-rich, and flexible.

Redocly CLI and Redoc are known as 'CLI tools'. The clue is in the name: *Redocly CLI*. CLI stands for Command-Line Interface.

## Mastering the command line

### What is a CLI?

If you're a tech writer who is used to writing and publishing docs using traditional WYSIWYG tools, CLIs can seem scary at first, but they're actually pretty amazing. And bonus: you get to use a retro-looking terminal and pretend you've gone back in time to the 1980s!

A CLI is a little terminal window that sends instructions (known as 'commands') to software and programs installed on your computer. There are many terminals out there. For Redocly CLI and Redoc, we use the `node.js` terminal to send commands.

### What is a command?

A command is exactly that: a written instruction sent to a computer program via a terminal window to command it to take some action.

In the world of Redocly CLI and Redoc, commands help us to manage API definition files. We use the `lint` command to validate files, `split` to split them into smaller files for easy maintenance, and `bundle` to put them back together when we're ready to publish them out.

Here are some examples of commands that you can type into a terminal window in order to send the Redocly CLI program some instructions:

`redocly lint`
`redocly split`
`redocly bundle`

Commands are really flexible. You might want to `lint` the heck out of all your definitions or just one you're particularly suspicious of. You might decide to set rules that limit the errors returned. Or you may want to relax the rules for some definitions, and crack the whip on others. You do all of this simply by adding more parameters into the command:

`redocly lint mydefinitions/myapi.yaml`
`redocly lint --max-problems=25`
`redocly split mydefinitions/myotherapi.yaml`

You can even make errors returned by commands look pretty:

`redocly lint --format=stylish`

You'll learn how to [run a command](#how-to-run-a-command) soon. But first, let's get Redocly CLI and Redoc installed.

## Installing Redocly CLI and Redoc
Did you notice our wonderful [Quickstart guide](../docs/cli/quickstart)? Did you read it and understand some of it, but not quite enough to install the software? That's OK! The guide was written primarily for developers so I'm going to break it down a little more, just for you.

### node.js

The `node.js` terminal is a self-contained environment that works best when sending commands to Redocly CLI and Redoc. You need to install it on your computer.

### GitHub

GitHub is an online version control system used to manage code, along with documentation in formats such as Markdown, YAML, HTML and XML. GitHub allows authorized team members to work on the same source content by checking it out, working in 'branches', then merging those branches back into the source.

You guessed it. Using GitHub to maintain code and docs together in the same place is what we mean by docs-as-code!

You need to have a GitHub account before you can install and use Redocly CLI and Redoc. An account is easy to set up, and having one looks fancy on your résumé.

[GitHub has its own docs](https://docs.github.com/en), but a quick YouTube search will unearth some great videos to help you get your head around the basics such as branches, forks, cloning, pull requests and projects. Knowing GitHub is not only vital for Redocly CLI and Redoc, it's a great skill to have!

### The openapi-starter project

`openapi-starter` is a [GitHub project](https://github.com/Redocly/openapi-starter) that we provide to our open-source community to help get them started with Redocly CLI.
Simply [follow the instructions](../docs/cli/openapi-starter) to clone (copy) the project to your own GitHub account.

The `openapi-starter` project automatically creates a folder structure on your local computer that can be used to organize your API definition files. It also provides a sample API definition file, which is great if you're new to API definitions. You can use this sample file to play around with commands while you're learning.

Although you can create your own folder structure, we recommend letting `openapi-starter` set it up initially (you can always make changes later, and you can add more API definition files too). The folder structure is also key when using the `split` and `bundle` commands, which are used to split up large definitions for easier maintenance, and compile the constituent files back into a single file when you're ready to publish your API reference docs.

The `openapi-starter` instructions mention GitHub Desktop. This is a piece of software that lets you manage GitHub branches on your local computer, work on them offline, then submit 'pull requests' when you're ready for others to review your changes. Again, YouTube will tell you all there is to know about GitHub Desktop.

### Installing Redocly CLI
We package up our software using [npm](https://www.w3schools.com/whatis/whatis_npm.asp) so it's easier for you to install it.

## How to run a command

On a Windows computer:
1. Click **Search**.
2. Type **cmd**.
3. Select to open **Node.js command prompt**.
4. `cd` (change directory).

`cd` (change directory) points the terminal to the directory where you want the action to take effect. Your terminal window will default to some directory on your computer. In our example, I start from the default `\Users` directory and use the `cd` command to change to a directory called `\redocly-openapi-starter\myproject` which is the *root* of where all my API definition files are stored:

```bash Command
C:\Users\jodyw>cd C:\Users\jodyw\APIs\redocly-openapi-starter\myproject
```

```bash Output
C:\Users\jodyw\APIs\redocly-openapi-starter\myproject>
```

I now decide to run the `lint` command against an API definition file called `customer.yaml` which is stored in my creatively named `\myproject` directory. I type `lint redocly customer.yaml` then press **Enter**.

```bash
C:\Users\jodyw\APIs\redocly-openapi-starter\myproject> lint redocly customer.yaml
```

Because `lint` found no errors in `customer.yaml` I get the following response from the `lint` command:

```bash
No configurations were defined in extends -- using built in recommended configuration by default.

validating customer.yaml...
customer.yaml: validated in 44ms

Woohoo! Your OpenAPI definition is valid. 🎉
```
This is just one of many responses that can come back from the [`lint` command](../docs/cli/commands/lint), but it gives you a feel for what commands do.

## Why linting is so important
And speaking of linting, let's take a moment to understand what it is and why it's vital to API docs.

Linting your OpenAPI definition ensures that it's valid and adheres to a set of rules and standards. This is especially important if your organization follows the design-first approach to developing APIs. You can use built-in linting rules, create your own custom rules — or a combination of both. Custom rules also extend basic functionality so you can respond to specific use-cases.

## A closer look at the Redocly configuration file
If you *really* want to get the best out of Redocly CLI (and our other products!), you need to get acquainted with `redocly.yaml`, otherwise known as the Redocly configuration file.
Now, we do have [a whole page dedicated to the config file](../docs/cli/configuration).
ut as you're new to all of this, simply put, this file contains configuration options that allow you to control how Redocly CLI and Redoc behave and how they are used. It helps you set rules to manage multiple API definition files, place limits on commands, and determine how published API docs should look and feel. And that's really only the tip of the iceberg.

When you use software with a UI, there's usually a settings screen that lets you customize things like security, format, and other functionality. Because Redocly CLI uses the command line and doesn't have a traditional UI, we use the `redocly.yaml` file in place of settings.

As you get more comfortable with our products and read the docs, you'll notice that we often mention the 'project directory' or 'working directory', and use phrases like 'at the root of the project directory'. This simply means where your API definition files are stored, and `redocly.yaml` needs to be located there too.

## A final word
We hope you feel more empowered and confident using Redocly CLI and Redoc. Ready to get started? Then go check out our [Quickstart guide](../docs/cli/quickstart). You'll be wrangling those API definition files in no time!
