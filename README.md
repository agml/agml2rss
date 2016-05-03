# AGML2RSS

This tool converts specially formatted `.agml` files to valid RSS feeds.

Given this input...

```
---
title: example.com
link: http://example.com
description: this is just an example site
language: Esperanto
generator: agml2rss
category: News/Technology
---

---
title: first!
link: example.com/first
description: the first post for example.com
---

---
title: second!
link: example.com/second
description: the second post for example.com
---
```

... it will yield...

```
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
        <channel>
                <title>example.com</title>
                <link>http://example.com</link>
                <description>this is just an example site</description>
                <language>Esperanto</language>
                <generator>agml2rss</generator>
                <category>News/Technology</category>
        </channel>
        <item>
                <title>first!</title>
                <link>example.com/first</link>
                <description>the first post for example.com</description>
        </item>
        <item>
                <title>second!</title>
                <link>example.com/second</link>
                <description>the second post for example.com</description>
        </item>
</rss>
```

## Usage

```
node agml2rss.js sample.agml
```

