<?php

$beginCareApiKey = get_option("begincare_api_key");
$beginCareApiURL = get_option("begincare_api_url");
$googleApiKey = get_option("google_api_key");
$providerPageSlug = get_option("provider_page_slug");

?>

<h1>Menu page</h1>
<form action="<?php echo rest_url( "/begincare/v1/settings" ); ?>" method="post">
  <input type="text" name="begincare-api-key" id="" placeholder="BeginCare Api key" value="<?php echo $beginCareApiKey; ?>" >
  <input type="text" name="begincare-api-url" id="" placeholder="Begincare Api URL" value="<?php echo $beginCareApiURL; ?>" >
  <input type="text" name="google-api-key" id="" placeholder="Google Api key" value="<?php echo $googleApiKey; ?>" >
  <input type="text" name="provider-page-slug" id="" placeholder="Provider Page Slug" value="<?php echo $providerPageSlug; ?>" >
  <input type="submit" value="Submit">
</form>
<div id="root"></div>