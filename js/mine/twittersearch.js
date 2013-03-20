/*
 * TwitStream - A jQuery plugin for the Twitter Search API
 * Version 1.2
 * http://kjc-designs.com/TwitStream
 * Copyright (c) 2009 Noah Cooper
 * Licensed under the GNU General Public License <http://www.gnu.org/licenses/>
*/
String.prototype.linkify=function(){
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&;\?\/.=]+/g,function(m){
		return m.link(m);
	});
};
String.prototype.linkuser=function(){
	return this.replace(/[@]+[A-Za-z0-9-_]+/g,function(u){
		return u.link("http://twitter.com/"+u.replace("@",""));
	});
};
String.prototype.linktag=function(){
	return this.replace(/[]+[A-Za-z0-9-_]+/,function(t){
		return t;
	});
};
var showTweetLinks='none';
function twittersearch(keyword,num,callback){
	var url="http://search.twitter.com/search.json?q="+keyword+"&rpp="+num+"&callback=?";
	$.getJSON(url,function(json){
		var result = [];
		$(json.results).each(function(){
			var tTime=new Date(Date.parse(this.created_at));
			var cTime=new Date();
			var sinceMin=Math.round((cTime-tTime)/60000);
			if(sinceMin==0){
				var sinceSec=Math.round((cTime-tTime)/1000);
				if(sinceSec<10)
					var since='vor weniger als 10 Sekunden';
				else if(sinceSec<20)
					var since='vor weniger als 20 Sekunden';
				else
					var since='vor 30 Sekunden';
			}
			else if(sinceMin==1){
				var sinceSec=Math.round((cTime-tTime)/1000);
				if(sinceSec==30)
					var since='vor 30 Sekunden';
				else if(sinceSec<60)
					var since='vor weniger als 1 Minute';
				else
					var since='vor 1 Minute';
			}
			else if(sinceMin<45)
				var since='vor '+sinceMin+' Minuten';
			else if(sinceMin>44&&sinceMin<60)
				var since='vor ca. 1 Stunde';
			else if(sinceMin<1440){
				var sinceHr=Math.round(sinceMin/60);
				if(sinceHr==1)
					var since='vor ungefähr 1 Stunde';
				else
					if(sinceHr >= 1) {
						var HrString = 'Stunden';
					} else {
						var HrString = 'Stunde';
					}
					var since='vor ungefähr '+sinceHr+' '+HrString;
			}
			else if(sinceMin>1439&&sinceMin<2880)
				var since='vor 1 Tag';
			else{
				var sinceDay=Math.round(sinceMin/1440);
				if(sinceDay > 1) {
					var dayString = 'Tagen';
				} else {
					var dayString = 'Tag';
				}
				var since='vor '+sinceDay+' '+dayString;
			}
			var tweet = {};
			tweet.userlink = 'http://twitter.com/'+this.from_user;
			tweet.userimage = this.profile_image_url;
			tweet.user = this.from_user;
			tweet.since = since;
			tweet.link = 'http://twitter.com/'+this.from_user+'/statuses/'+this.id;
			tweet.message = this.text.linkify().linkuser().linktag().replace(/<a/g,'<a target="_blank"');
			result.push(tweet);
		});
		callback(result);
	});
	return(false);
}
