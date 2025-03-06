<?php 

$BCE = get_field('begincare_base_endpoint', 'option');
$key = get_field('api_key', 'option');

$queryParams = http_build_query([
    'addressState'  => $_GET['state'],
    'categories'    => $_GET['serviceId'],
    'lat'   => $_GET['lat'],
    'lng'   => $_GET['lng'],
    'begincareApiKey'   => $key,
    'origin' => home_url(),
    'limit' => $attributes['resultsCount']
]);

$providersResponse = wp_remote_get(
    $BCE.'providers/search?'.$queryParams,
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

$avatarPlaceholder = get_field('avatar-placeholder', 'option');

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
            <div
                class="providerCard -rozshuk-markerSource"
                location-lat="<?php echo $provider->locationLatitude; ?>"
                location-lng="<?php echo $provider->locationLongitude; ?>"
            >
                <div class="providerCard__avatar">
                    <img src="<?php echo wp_get_attachment_url( $avatarPlaceholder ); ?>" alt="">
                </div>
                <div class="providerCard__content">
                    <div class="providerCard__header">
                        <div class="providerCard__avatar">
                            <img src="<?php echo wp_get_attachment_url( $avatarPlaceholder ); ?>" alt="">
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
            </div>
        <?php } ?>
    </div>
    <div class="providers__map">
        <div id="map-holder"></div>
    </div>
</div>