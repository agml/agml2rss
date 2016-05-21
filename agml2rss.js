var fs=require("fs");
var agml=require("agml");

var args=process.argv.slice(2);

if(args.length<1){
    console.log("Try passing the name of an agml file");
    process.exit();
}

var source=args.map(function(fn){
    return fs.readFileSync(fn,'utf-8');
});

var rss={};

var swap=function(text,dict){
    return text.replace(/\{.*?\}/g,function(key){
        var temp=key.slice(1,-1);
        return dict[temp]||'';
    });
};

var oneTab = '    ';
rss.makeTag=function(type,content,indent){
    indent=indent||1;

    var outertabs='';
    var innertabs=oneTab;

    for(i=1;i<indent;i++){
        innertabs+=oneTab;
        outertabs+=oneTab;
    }

    return swap(outertabs+'<{type}>\n{content}\n'+outertabs+'</{type}>',{
        type:type,
        content:Object.keys(content)
        .map(function(key){
            return swap(innertabs+'<{key}>{val}</{key}>',{
                key:key,
                val:content[key]
            });
        }).join("\n") //+outertabs)
    });
};

rss.makeFeed=function(source){
    var results=[];
    agml.parse(source,results);
    var channel=results[0];
    var items=results.slice(1);

    var channelXML=Object.keys(channel).map(function (type) {
        //console.log(type, channel[type]);
        var tag = swap('<{type}>{content}</{type}>', {
            type: type,
            content: channel[type]
        });
        //rss.makeTag(key, channel, 2);
        //console.log(tag);
        return tag;
    }).map(function (x) { return oneTab + oneTab + x; }).join('\n');

    //console.log(channelXML);


    //console.log(channel);
    //process.exit();



   // rss.makeTag('channel',channel,2);
    var itemsXML=items.map(function(item){
        return rss.makeTag('item', item, 3);
    }).join("\n");

    var frame=function(){/*<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
{channel}
{items}
    </channel>
</rss>
*/}.toString().slice(14,-3);

    var final=swap(frame,{
        channel:channelXML,
        items:itemsXML
    });

    return final;
};

source.map(function(source){
    console.log(rss.makeFeed(source));
});
