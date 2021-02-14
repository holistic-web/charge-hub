<template>
    <section class="EditLocation">
        <div>
            <v-text-field
                label="Search then click the map to add a pin"
                v-model="map.searchTerm"
                @input="onSearchInput"
            />
            <google-map
                class="EditLocation__map"
                :center="map.center"
                :zoom="19"
                :pins="pins"
                @mapClick="onMapClick"
            />
        </div>
        <v-text-field
            label="Give this charge point a name"
            v-model="editedValue.name"
            @input="onValueChange"
        />
    </section>
</template>

<script>
import _ from 'lodash';
import geocode from '../lib/geocode';
import GoogleMap from './GoogleMap';

export default {
    components: {
        GoogleMap,
    },
    props: {
        value: {
            required: true,
            type: Object,
        },
    },
    data: () => ({
        editedValue: {},
        map: {
            center: {
                // hard coded to Leon Bankside
                latitude: 51.506521809858164,
                longitude: -0.09953073735887052,
            },
            searchTerm: '',
            lastSearchTerm: '',
        },
    }),
    computed: {
        pins() {
            if (!this.editedValue.location) return [];
            return [
                {
                    ...this.editedValue,
                    icon: 'https://i.imgur.com/ozOhQTP.png',
                },
            ];
        },
    },
    methods: {
        onValueChange() {
            this.$emit('input', this.editedValue);
        },
        onSearchInput: _.debounce(async function () {
            if (this.map.searchTerm === this.map.lastSearchTerm) return;
            const place = await geocode({ address: this.map.searchTerm });
            this.map.center = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
            };
        }, 500),
        onMapClick(location) {
            this.editedValue.location = location;
            this.onValueChange();
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.editedValue = { ...this.value };
            },
        },
    },
};
</script>

<style lang="scss">
.EditLocation {
    > * {
        margin-bottom: 1rem;
    }

    &__map {
        height: 250px;
    }
}
</style>
