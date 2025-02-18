const googleApiKey = "AIzaSyCI-vsO_E3616VcbS0DsvJ0IvgoXD2ZhvU";
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({key: googleApiKey, v: "weekly"});

const searchGroups = document.querySelectorAll('.searchGroup');
const autocompleteInput = document.querySelector('.searchGroup__input_autocomplete');
const searchButton = document.querySelector('.searchButton');

const searchQuery = {};
let params = {};

const clearValue = (e) => {
    const group = e.target.closest('.searchGroup');
    const input = group.querySelector('.searchGroup__input');
    const selectedValueContainer = group.querySelector('.searchGroup__selectedValueContainer');
    selectedValueContainer.style.display = 'none';
    input.value = '';
}


const handleInput = (group) => {
    const input = group.querySelector('.searchGroup__input');
    const dropdown = group.querySelector('.searchGroup__options');
    input.addEventListener('click', () => {
        if(dropdown){ dropdown.style.display = 'flex';}
    });
    document.addEventListener('click' , (e) => {
        if( dropdown && !e.target.closest('.searchGroup') ){
            dropdown.style.display = 'none';
        }
    })
    if(dropdown){
        const options = dropdown.querySelectorAll('.searchGroup__option');
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            dropdown.style.display = 'flex';
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                option.classList.remove('searchGroup__option_hidden');
                if( option.textContent.toLowerCase().indexOf(value.toLowerCase()) === -1 ){
                    option.classList.add('searchGroup__option_hidden')
                }
            }
        })
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            option.addEventListener('click', () => {
                input.value = '';
                selectValue(option);
            })
        }
    }
    const closeSelectedValueButton = group.querySelector('.searchGroup__selectedValueClose');
    if(closeSelectedValueButton){
        closeSelectedValueButton.addEventListener('click', clearValue);
    }
}
const createQueryURL = () => {
    params = new URLSearchParams(searchQuery);
}

const selectValue = (option) => {
    const label = option.textContent;
    const group = option.closest('.searchGroup');
    const options = group.querySelector('.searchGroup__options');
    const selectedValueContainer = group.querySelector('.searchGroup__selectedValueContainer');
    const selectedValueLabel = selectedValueContainer.querySelector('.searchGroup__selectedValue');
    selectedValueLabel.textContent = label;
    selectedValueContainer.style.display = 'flex';
    options.style.display = 'none';
    searchQuery.service = option.textContent;
    searchQuery.serviceId = option.value;
    createQueryURL();
}

for (let i = 0; i < searchGroups.length; i++) {
    const searchGroup = searchGroups[i];
    handleInput(searchGroup);
}

async function initAutocomplete(){
    await google.maps.importLibrary('places');
    const autocomplete = new google.maps.places.Autocomplete(
        autocompleteInput,
        {
            fields: ['geometry', 'name', 'address_components'],
            componentRestrictions: {
                country: ['us'],
            },
        }
    )
    const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        const state = place.address_components.filter((x) => {return x.types[0] === 'administrative_area_level_1'})[0].short_name;
        if( place.geometry ){
            searchQuery.lat = place.geometry.location.lat();
            searchQuery.lng = place.geometry.location.lng();
            searchQuery.location = place.name;
            searchQuery.state = state;
        }
        createQueryURL();
    }
    autocomplete.addListener('place_changed', onPlaceChanged);
}

initAutocomplete();

const goToResultsPage = (e) => {
    e.preventDefault();
    const baseUrl = e.target.getAttribute('default-href');
    if(
        Object.hasOwn(searchQuery, 'service') &&
        Object.hasOwn(searchQuery, 'serviceId') &&
        Object.hasOwn(searchQuery, 'lat') &&
        Object.hasOwn(searchQuery, 'lng') &&
        Object.hasOwn(searchQuery, 'location') &&
        Object.hasOwn(searchQuery, 'state')
    ){
        if( e.target.getAttribute('target')){
            window.open(baseUrl + '?' + params.toString()).focus();
        } else {
            window.location.href = baseUrl + '?' + params.toString();
        }
    }
}

searchButton.addEventListener('click', goToResultsPage);
