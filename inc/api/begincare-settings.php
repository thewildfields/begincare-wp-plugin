<?php 

function ___bcp__register_settings_api_route () {
  register_rest_route(
    'begincare/v1',
    'settings',
    array(
      "methods" => ["GET", "POST"],
      "callback" => "___bcp__settings_api_route",
      "permission_callback" => "__return_true"
    ));
}

function ___bcp__settings_api_route( WP_REST_Request $request ) {

  $method = $request->get_method();

  if($method === "GET"){
    $apiKey = get_option( 'begincare_api_key' );
    return new WP_REST_Response( json_decode($apiKey) );
  }

  if($method === "POST"){
    $params = $request->get_body_params();
    $beginCareApiKey = $params["begincare-api-key"];
    $beginCareApiURL = $params["begincare-api-url"];
    $googleApiKey = $params["google-api-key"];
    $providerPageSlug = $params["provider-page-slug"];
    if( $beginCareApiKey ){
      update_option( "begincare_api_key", $beginCareApiKey, true );
    }
    if( $beginCareApiURL ){
      update_option( "begincare_api_url", $beginCareApiURL, true );
    }
    if( $googleApiKey ){
      update_option( "google_api_key", $googleApiKey, true );
    }
    if( $providerPageSlug ){
      update_option( "provider_page_slug", $providerPageSlug, true );
    }
    return;
  }

}

add_action( "rest_api_init", "___bcp__register_settings_api_route" );
