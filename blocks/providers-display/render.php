<?php 

$begincareAPIEndpoint = get_option('begincare_api_url');
$begincareAPIKey = get_option( 'begincare_api_key' );

$queryParams = http_build_query([
    'addressState'  => $_GET['state'],
    'categories'    => $_GET['serviceId'],
    'addressCity'   => $_GET['location'],
    'lat'   => $_GET['lat'],
    'lng'   => $_GET['lng'],
    'begincareApiKey'   => $begincareAPIKey,
    'origin' => home_url(),
    'limit' => $attributes['resultsCount']
]);

$requestURL = $begincareAPIEndpoint.'providers/search?'.$queryParams;

// print_r($requestURL);

$providersResponse = wp_remote_get(
    $requestURL,
    [
        'sslverify' => false,
    ]
);

if( !is_wp_error($providersResponse) && $providersResponse['response']['code'] === 200){
    $responseBody = json_decode($providersResponse['body']);
    $providers = $responseBody->items;
    $resultsCount = $responseBody->resultsCount;
} else { 
    print_r('error');
    return;
}

if( !$resultsCount ){
    print_r('no results found');
    return;
}

$avatarPlaceholder = BCP_DIR_URL . '/blocks/providers-display/assets/logoPlaceholder.png';

?>


<?php if( $attributes['showResultsHeader'] ){ ?>
    <div class="___bg__providersDisplayHeader">
        <h1 class="providerResults__pageTitle">Results for <span id='resultsTitle__placeholder'></span></h1>
    </div>
<?php } ?>

<?php if( $attributes['showFilter'] ){ ?>
    <div class="providerResults__refineSearch">
        <?php if( $attributes['views'] === 'both') { ?>
            <div class="displayModeSwitch">
                <button
                    class="displayModeSwitch__button"
                    target-view='list'
                >
                    View List
                </button>
                <button
                    class="displayModeSwitch__button displayModeSwitch__button_active"
                    target-view='map'
                >
                    View Map
                </button>
            </div>
        <?php } ?>
    </div>
<?php } ?>






<div class="providers__display providers__display_mapView">
    <div class="providerCard__results">
        <?php foreach ($providers as $provider) { ?>
            <a
                class="providerCard -rozshuk-markerSource"
                location-lat="<?php echo $provider->locationLatitude; ?>"
                location-lng="<?php echo $provider->locationLongitude; ?>"
                href="<?php echo home_url(get_option("provider_page_slug").'?id='.$provider->_id); ?>"
                target="_blank"
            >
                <div class="providerCard__avatar">
                    <img src="<?php echo $avatarPlaceholder; ?>" alt="">
                </div>
                <div class="providerCard__content">
                    <div class="providerCard__header">
                        <div class="providerCard__avatar">
                    <img src="<?php echo $avatarPlaceholder; ?>" alt="">
                        </div>
                        <p class="providerCard__title">
                            <?php echo $provider->name; ?>
                        </p>
                    </div>
                    <div class="providerCard__info">
                        <div class="providerCard__infoCard">
                            <p><?php if(property_exists($provider, 'streetAddress')){ echo $provider->streetAddress; } ?></p>
                            <p>
                                <?php if(
                                    property_exists($provider, 'addressCity') &&
                                    property_exists($provider, 'addressState') &&
                                    property_exists($provider, 'addressPostalCode')
                                ){ echo $provider->addressCity.', '.$provider->addressState.' '.$provider->addressPostalCode; } ?>
                            </p>
                            <p>
                                <?php
                                    if( $provider->distance > 1 ){
                                        echo $provider->distance . ' miles away';
                                    }
                                ?>
                            </p>
                        </div>
                        <div class="providerCard__infoCard">
                            <p><?php if(property_exists($provider, 'phone')){ echo $provider->phone; } ?></p>
                            <?php if(property_exists($provider, 'website')){
                                echo '<a target="_blank" href="'.$provider->website.'">'.
                                    $provider->website
                                .'</a>';
                            } ?>
                        </div>
                    </div>
                </div>
            </a>
        <?php } ?>
    </div>
    <div class="providers__map">
        <div id="map-holder"></div>
    </div>
</div>