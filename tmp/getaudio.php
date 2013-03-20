<?
$url = "http://360langstrasse.sf.tv/media/sound/ambi.ogg";
$fp = fopen (dirname(__FILE__) . '/media/sound/ambi.ogg', 'w+');

    $ch = curl_init($url);

    curl_setopt_array($ch, array(
    CURLOPT_URL            => $url,
    CURLOPT_BINARYTRANSFER => 1,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_FILE           => $fp,
    CURLOPT_TIMEOUT        => 50,
    CURLOPT_USERAGENT      => 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)'
    ));

$results = curl_exec($ch);
if(curl_exec($ch) === false)
 {
  echo 'Curl error: ' . curl_error($ch);
 }

?>