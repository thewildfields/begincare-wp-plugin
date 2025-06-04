<?php

$begincareAPIEndpoint = get_option('begincare_api_url');
$begincareAPIKey = get_option( 'begincare_api_key' );

$requestURL = $begincareAPIEndpoint.'provider/'.$_GET['id'];

$providerResponse = wp_remote_get(
    $requestURL,
    [
        'sslverify' => false
    ]
);

if( !is_wp_error($providerResponse) && $providerResponse['response']['code'] === 200){
    $provider = json_decode($providerResponse['body']);
} else { 
    print_r('error');
    return;
}

?>

<div class="___bc__singleProviderDisplay">

    <h1><?php echo $provider->name; ?></h1>

    <?php if (property_exists( $provider, 'tagline')) { ?>
        <h2><?php echo $provider->tagline; ?></h2>
    <?php } ?>

    <?php if (property_exists( $provider, 'description')) { ?>
        <h2>About Provider</h2>
        <p><?php echo $provider->description; ?></p>
    <?php } ?>

    <h2>Contact information</h2>
    <?php if (property_exists( $provider, 'phone')) { ?>
        <p><?php echo $provider->phone; ?></p>
    <?php } ?>
    <?php if (property_exists( $provider, 'website')) { ?>
        <p><?php echo $provider->website; ?></p>
    <?php } ?>

    <h2>Address</h2>
    <?php
        if(
            (property_exists( $provider, 'streetAddress')) &&
            (property_exists( $provider, 'addressCity')) &&
            (property_exists( $provider, 'addressState')) &&
            (property_exists( $provider, 'addressPostalCode'))
        ) {
    ?>
        <p><?php echo $provider->streetAddress.', '.$provider->addressCity.' '.$provider->addressState.', '.$provider->addressPostalCode; ?></p>
    <?php } ?>

</div>
