<?
$id = 1;
for ($id = 1; $id <= 630; ++$id) {
$len = strlen($id);
if($len == 1) {
	$add = "00";
}
if($len == 2) {
	$add = "0";
}
if($len == 3) {
	$add = "";
}

set_time_limit(0);
$url = "http://360langstrasse.sf.tv/media/street/night/l/vid-".$add.$id.".jpg";
$fp = fopen (dirname(__FILE__) . '/shared/street/night/l/vid-'.$add.$id.'.jpg', 'w+');

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
}
 
?>