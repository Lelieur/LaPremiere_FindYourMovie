import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const CustomMap = (address) => {

    const [addressValue, setAddressValue] = useState(address)
    const [coordinates, setCoordinates] = useState({})
    useEffect(() => { handleMap() }, [])

    const handleMap = () => {
        const fullAddress = `${addressValue.address.street} ${addressValue.address.city} ${addressValue.address.country}`
        const addressCorrected = fullAddress.replaceAll(" ", "");
        getCoordinates(addressCorrected)
    }

    const getCoordinates = addressCorrected => {

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: addressCorrected }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                // Extraer coordenadas del primer resultado

                const location = results[0].geometry.location;

                console.log('Dirección:', results[0].formatted_address);
                console.log('Latitud:', location.lat());
                console.log('Longitud:', location.lng());

                setCoordinates({ lat: location.lat(), lng: location.lng() })
                console.log(coordinates)

            } else {
                console.error('Geocodificación fallida:', status);
            }
        });
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAkBMHV6MJbVt_LyNMzNEO3eGdlQMz-qIw"
    })

    const [map, setMap] = useState(null)

    const onLoad = (map) => console.log('Aquí haz lo que necesites tras la carga del mapa')
    const onUnmount = () => setMap(null)

    return isLoaded && (

        <div>
            <GoogleMap
                mapContainerStyle={{ height: '300px' }}
                zoom={12}
                onLoad={onLoad}
                center={{ lat: -3.745, lng: -38.523 }}
                onUnmount={onUnmount}
            >
                <Marker position={{ lat: -3.745, lng: -38.523 }} />
            </GoogleMap>
        </div>
    )
}

export default CustomMap