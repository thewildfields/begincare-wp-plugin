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
]);

$providersResponse = wp_remote_get(
    $BCE.'providers/search?'.$queryParams,
    [
        'sslverify' => false,
    ]
);

if( !is_wp_error($providersResponse) && $providersResponse['response']['code'] === 200){
    $providers = json_decode($providersResponse['body'])->items;
}

$avatarPlaceholder = get_field('avatar-placeholder', 'option');

?>

<h1 class="providerResults__pageTitle">Results for <span id='resultsTitle__placeholder'></span></h1>

<div class="providerResults__refineSearch">
    <div class="providerResults__topLeft">
    </div>
    <div>
        <div class="displayModeSwitch">
            <button
                class="displayModeSwitch__button displayModeSwitch__button_active"
                target-view='list'
            >
                View List
            </button>
            <button
                class="displayModeSwitch__button"
                target-view='map'
            >
                View Map
            </button>
        </div>
    </div>
</div>

<div class="providers__display">
    <div class="providerCard__results">
        <?php foreach ($providers as $provider) { ?>
            <?php
                // echo '<pre>';
                // print_r( $provider);
                // echo '</pre>';
            ?>
            <div
                class="providerCard -rozshuk-markerSource"
                location-lat="<?php echo $provider->locationLatitude; ?>"
                location-lng="<?php echo $provider->locationLongitude; ?>"
            >
                <div class="providerCard__avatar">
                    <img src="<?php echo wp_get_attachment_url( $avatarPlaceholder ); ?>" alt="">
                </div>
                <div class="providerCard__content">
                    <div>
                        <div class="providerCard__header">
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
                    <div class="providerCard__avatar providerCard__avatar_mapView">
                        <img src="<?php echo wp_get_attachment_url( $avatarPlaceholder ); ?>" alt="<?php echo $provider->name; ?>">
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class="providers__map">
        <div id="map-holder"></div>
    </div>
</div>