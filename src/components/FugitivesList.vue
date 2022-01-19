<template>
    <div id="fugitives" class="container">
            <article v-for="(fugitive, n) in fugitives" class="fugitive media pb-4">
                <div class="media-left is-relative">
                    <figure  v-on:click.prevent="selectFugitive(n)" class="image is-128x128">
                        <img :src="fugitive.images[0].thumb" :alt="fugitive.images[0].caption">
                    </figure>
                </div>
                <div class="media-content2">
                    <div class="the-content has-text-white">
                        <h5 class="has-text-weight-semibold has-text-white is-size-5 is-uppercase"><span class="is-numerated">{{n+1}}</span> {{fugitive.title}}</h5>
                        <p class="my-3">{{fugitive.description}}</p>
                        <div class="my-3" v-html="fugitive.caution"></div>
                    </div>
                    <div class="buttons">
                        <button v-on:click.prevent="selectFugitive(n)" class="button is-white is-outlined is-small">View More</button>
                    </div>
                </div>
            </article>
            <div id="fugitive-modal" class="modal" :class="{'is-active':activeModal}">
                <div class="modal-background" v-on:click.prevent="closeModal"></div>
                <div class="modal-card">
                    <div class="modal-card-body">
                        <div v-if="selectedFugitive" class="columns">
                            <div class="column is-4">
                                <figure class="image">
                                    <img :src="selectedFugitive.images[0].large" :alt="selectedFugitive.images[0].caption">
                                </figure>
                            </div>
                            <div class="column">
                                <h5 class="has-text-weight-semibold is-size-4 mt-3">{{selectedFugitive.title}}</h5>
                                <p class="mb-3" v-if="selectedFugitive.aliases!=null">Aliases: {{selectedFugitive.aliases | split}}</p>
                                <p class="is-uppercase" v-if="selectedFugitive.sex"><span class="icon"><i :class="{'mdi-gender-female':(selectedFugitive.sex.toLowerCase()=='female'),'mdi-gender-male':(selectedFugitive.sex.toLowerCase()=='male')}" class="mdi mdi-gender-female"></i></span>{{selectedFugitive.sex}}</p>
                                <p class="is-uppercase" v-if="selectedFugitive.eyes"><span class="icon"><i class="mdi mdi-eye"></i></span>{{selectedFugitive.eyes}}</p>
                                <p class="is-uppercase" v-if="selectedFugitive.hair"><span class="icon"><i class="mdi mdi-face"></i></span>{{selectedFugitive.hair}}</p>
                                <p class="mt-3 has-text-danger" v-if="selectedFugitive.warning_message">{{selectedFugitive.warning_message}}</p>
                                <p v-if="selectedFugitive.description" class="py-3">{{selectedFugitive.description}}</p>
                                <p v-if="selectedFugitive.reward_text" class="py-3">{{selectedFugitive.reward_text}}</p>
                                <p v-if="selectedFugitive.details" class="py-3" v-html="selectedFugitive.details"></p>
                                <div v-if="selectedFugitive.remarks" class="my-3" v-html="selectedFugitive.remarks"></div>
                            </div>
                        </div>
                        <div v-else>
                            <p>Select a fugitive</p>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" v-on:click.prevent="closeModal" aria-label="close"></button>
            </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        props:["size"],
        beforeMount: function(){
            if(this.size){
                this.pageSize=this.size
            }
        },
        mounted: function (){
            this.getFugitives();
        },
        data: function () {
            return {
                activeModal:false,
                fugitives:[],
                selectedFugitive:null,
                pageSize:10
            }
        },
        methods: {
            closeModal(){
                this.selectedFugitive = null;
                this.activeModal=false;
            },
            selectFugitive(n){
                this.selectedFugitive = this.fugitives[n];
                this.activeModal=true;
            },
            getFugitives(){
                let currentObj = this;
                axios({
                    method: 'get',
                    async: false,
                    url: 'https://api.fbi.gov/wanted/v1/list?pageSize='+currentObj.pageSize
                }).then(function (response) {
                    currentObj.fugitives = response.data.items;
                }).catch(function (error) {
                    console.log(error)
                });
            }

        }
  } 
</script>