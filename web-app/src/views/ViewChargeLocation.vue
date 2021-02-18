<template>
    <section class="ViewChargeLocation">
        <loader v-if="page.isLoading || !chargeLocation" />
        <template v-else>
            <div class="ViewChargeLocation__header">
                <div class="ViewChargeLocation__header__left">
                    <v-icon
                        class="ViewChargeLocation__header__back"
                        @click="goToMap"
                        >mdi-arrow-left</v-icon
                    >
                    <h1 v-text="`Charge Location: ${chargeLocation.name}`" />
                </div>
                <div class="ViewChargeLocation__header__right">
                    <v-btn
                        v-if="user.isAdmin"
                        color="error"
                        v-text="adminButtonText"
                        @click="onAdminButtonClick"
                    />
                    <span
                        v-text="
                            `Added ${chargeLocation.createdAt
                                .toDate()
                                .toLocaleDateString()}`
                        "
                    />
                </div>
            </div>

            <template v-if="page.inEditMode">
                <edit-charge-location
                    class="ViewChargeLocation__edit"
                    v-model="chargeLocationCopy"
                />
                <v-btn
                    class="mb-3"
                    color="primary"
                    v-text="'Update'"
                    block
                    @click="onUpdateClick"
                />
                <v-btn
                    color="error"
                    v-text="'Delete'"
                    block
                    @click="onDeleteClick"
                />
            </template>

            <template v-else>
                <google-map
                    class="ViewChargeLocation__map"
                    :center="chargeLocation.location"
                    :zoom="19"
                    :pins="pins"
                />

                <section class="ViewChargeLocation__inner">
                    <p v-text="chargeLocation.description" />
                    <div class="ViewChargeLocation__tags">
                        <v-chip
                            v-for="tag in chargeLocation.tags"
                            :key="tag"
                            color="primary"
                            v-text="tag"
                        />
                    </div>
                </section>
            </template>
        </template>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GoogleMap from '../components/GoogleMap';
import Loader from '../components/Loader';
import EditChargeLocation from '../components/EditChargeLocation';

// hard coded to Leon Bankside
const DEFAULT_LOCATION = {
    latitude: 51.506521809858164,
    longitude: -0.09953073735887052,
};

export default {
    components: {
        GoogleMap,
        Loader,
        EditChargeLocation,
    },
    data: () => ({
        page: {
            inEditMode: false,
            isLoading: false,
        },
        map: {
            center: DEFAULT_LOCATION,
        },
        chargeLocationCopy: null,
    }),
    computed: {
        ...mapGetters({
            chargeLocation: 'charge-locations/detail',
            user: 'account/user',
        }),
        adminButtonText() {
            if (this.page.inEditMode) return 'Back';
            return 'Edit';
        },
        id() {
            return this.$route.params.id;
        },
        pins() {
            return [
                {
                    ...this.chargeLocation,
                },
            ];
        },
    },
    methods: {
        ...mapActions({
            fetchChargeLocation: 'charge-locations/fetchDetail',
            updateChargeLocation: 'charge-locations/update',
            deleteChargeLocation: 'charge-locations/delete',
        }),
        async fetchData() {
            this.page.isLoading = true;
            try {
                await this.fetchChargeLocation(this.id);
            } catch (err) {
                this.$toasted.error(err.message);
            }
            this.page.isLoading = false;
        },
        goToMap() {
            this.$router.push({ name: 'map' });
        },
        onAdminButtonClick() {
            this.page.inEditMode = !this.page.inEditMode;
            if (this.page.inEditMode) {
                this.chargeLocationCopy = { ...this.chargeLocation };
            }
        },
        async onUpdateClick() {
            this.page.isLoading = true;
            try {
                await this.updateChargeLocation(this.chargeLocationCopy);
                this.fetchData();
            } catch (err) {
                this.$toasted.error(err.message);
            }
            this.page.isLoading = false;
        },
        async onDeleteClick() {
            const confirmation = await this.$confirm(
                "Are you sure you'd like to delete this document"
            );
            if (!confirmation) return;
            this.page.isLoading = true;
            try {
                await this.deleteChargeLocation(this.chargeLocationCopy._id);
            } catch (err) {
                this.$toasted.error(err.message);
            }
            this.page.isLoading = false;
            this.$router.push({ name: 'map' });
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: 'fetchData',
        },
    },
};
</script>

<style lang="scss">
@import '../styles';

.ViewChargeLocation {
    justify-content: center;
    align-items: center;

    &__header {
        margin: 1rem;
        display: flex;
        flex-direction: column;

        @media screen and (min-width: $BREAKPOINT_TABLET) {
            flex-direction: row;
            justify-content: space-between;
        }

        &__left {
            display: flex;
            flex-direction: row;
        }

        &__right {
            text-align: right;

            @media screen and (min-width: $BREAKPOINT_TABLET) {
                text-align: left;
            }

            > * {
                margin-left: 1rem;
            }
        }

        &__back {
            margin-right: 1rem;
            cursor: pointer;
        }
    }

    &__map {
        height: 250px;
        margin: 1rem 0;
    }

    &__inner {
        padding: 1rem;
    }

    &__tags {
        > * {
            margin-right: 0.5rem;
        }
    }
}
</style>
