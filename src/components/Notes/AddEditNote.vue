<template>
  <div class="card p-4 mb-5" :class="`has-background-${ bgColor }-dark`">
      <label v-if="label" class="label has-text-white">{{ label }}</label>
        <div class="field">
            <div class="control">
                <div class="card mb-4" v-for="question in estimates" :key="question.propertyName">
                    <div class="card-content has-text-centered">
                        <p class="title">{{question.title}}</p>
                        <p class="subtitle">{{question.subtitle}}</p>
                        <div class="columns">
                            <div class="column" v-for="option in question.options" :key="option.value">
                                <label :for="`${option.value}${question.propertyName}`" class="radio">
                                    <input :id="`${option.value}${question.propertyName}`" v-model="note[question.propertyName]" :value="option.value" type="radio" :name="question.propertyName" />
                                    <div>
                                        <div>{{$filters.smiley(option.value)}}</div>
                                        <small>{{option.description}}</small>
                                    </div>
                                </label>                              
                            </div>                        
                        </div>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content">
                        <p class="title">Hur söker du ett arbete?</p>
                        <p class="subtitle">Kryssa gärna i fler altenativ</p>
                        <div class="rows" v-for="option in multipleChoiceOptions" :key="option.propertyName">
                            <div class="row my-2">
                                <label :for="option.propertyName" :class="option.type">  
                                    <input :class="option.class" :id="option.propertyName" v-model="note[option.propertyName]" :type="option.type" placeholder="Annat sätt? - ange det här!" />
                                    {{option.description}}
                                </label>
                            </div>
                        </div>   
                    </div>
                </div>
<!--
                <div class="card mb-4">
                    <div class="card-content has-text-centered">
                        <p class="title">Individens tro på att få ett arbete</p>
                        <p class="subtitle">Tror du att du kan klara av att arbeta?</p>




                        <div class="columns">
                            <div class="column">
                                <label for="zerobeliefInWork" class="radio">
                                    <input id="zerobeliefInWork" v-model="note.beliefInWork" value="1" type="radio" name="beliefInWork" />
                                    <div>
                                        <div>{{$filters.smiley(1)}}</div>
                                        <small>Jag tror inte att jag kan klara av att arbeta</small>
                                    </div>
                                </label>
                                
                            </div>
                        
                        
                            <div class="column">
                                <label for="onebeliefInWork" class="radio">
                                    <input id="onebeliefInWork" v-model="note.beliefInWork" value="2" type="radio" name="beliefInWork" />
                                    <div>
                                        <div>🙁</div>
                                        <small>Jag är väldigt osäker på om jag kan klara av att arbeta</small>
                                    </div>
                                </label>
                            </div>
                        
                        
                            <div class="column">
                                <label for="twobeliefInWork" class="radio">
                                    <input id="twobeliefInWork" v-model="note.beliefInWork" value="3" type="radio" name="beliefInWork" />
                                    <div>
                                        <div>😐</div>
                                        <small>Jag är osäker på om jag kan klara av att arbeta</small>
                                    </div>
                                </label>
                            </div>
                        
                        
                            <div class="column">
                                <label for="threebeliefInWork" class="radio">
                                    <input id="threebeliefInWork" v-model="note.beliefInWork" value="4" type="radio" name="beliefInWork" />
                                    <div>
                                        <div>🙂</div>
                                        <small>Jag är någorlunda säker på att jag kan klara av att arbeta</small>
                                    </div>
                                </label>
                            </div>
                        
                        
                            <div class="column">
                                <label for="fourbeliefInWork" class="radio">
                                    <input id="fourbeliefInWork" v-model="note.beliefInWork" value="5" type="radio" name="beliefInWork" />
                                    <div>
                                        <div>😀</div>
                                        <small>Jag är helt säker på att jag kan klara av att arbeta</small>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content has-text-centered">
                        
                        <p class="title">Kunskap om arbetsmarknaden</p>
                        <p class="subtitle">Tror du att dina kompetenser är till nytta på en arbetsplats?</p>

                        <div class="columns">
                            <div class="column">
                                <label for="zerolaborMarket" class="radio">
                                    <input id="zerolaborMarket" v-model="note.laborMarket" value="1" type="radio" name="laborMarket" />
                                        <div>😢</div>
                                        <small>Jag tror inte att jag har någon kunskap att erbjuda en arbetsplats</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="onelaborMarket" class="radio">
                                    <input id="onelaborMarket" v-model="note.laborMarket" value="2" type="radio" name="laborMarket" />
                                        <div>🙁</div>
                                        <small>Jag tvivlar starkt på att jag har någon kunskap att erbjuda en arbetsplats</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="twolaborMarket" class="radio">
                                    <input id="twolaborMarket" v-model="note.laborMarket" value="3" type="radio" name="laborMarket" />
                                        <div>😐</div>
                                        <small>Det varierar. Ibland blir jag osäker på om jag har något att erbjuda eller inte</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="threelaborMarket" class="radio">
                                    <input id="threelaborMarket" v-model="note.laborMarket" value="4" type="radio" name="laborMarket" />
                                        <div>🙂</div>
                                        <small>Jag är för det mesta säker på att jag har något att erbjuda en arbetsplats</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="fourlaborMarket" class="radio">
                                    <input id="fourlaborMarket" v-model="note.laborMarket" value="5" type="radio" name="laborMarket" />
                                        <div>😀</div>
                                        <small>Jag är säker på att jag har massor att erbjuda en arbetsplats</small>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content has-text-centered">
                        <p class="title">Målmedvetenhet</p>
                        <p class="subtitle">Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?</p>

                        <div class="columns">
                            <div class="column">
                                <label for="zeropurposeFulness" class="radio">
                                    <input id="zeropurposeFulness" v-model="note.purposeFulness" value="1" type="radio" name="purposeFulness" />
                                        <div>😢</div>
                                        <small>Jag vet inte hur jag ska göra för att nå ett arbete</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="onepurposeFulness" class="radio">
                                    <input id="onepurposeFulness" v-model="note.purposeFulness" value="2" type="radio" name="purposeFulness" />
                                        <div>🙁</div>
                                        <small>Jag vet till viss del vad jag ska för att förbättra mina möljigheter att nå ett arbete</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="twopurposeFulness" class="radio">
                                    <input id="twopurposeFulness" v-model="note.purposeFulness" value="3" type="radio" name="purposeFulness" />
                                        <div>😐</div>
                                        <small>Jag vet ganska väl vad jag ska göra för att förbättra mina möjligheter att nå ett arbete</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="threepurposeFulness" class="radio">
                                    <input id="threepurposeFulness" v-model="note.purposeFulness" value="4" type="radio" name="purposeFulness" />
                                        <div>🙂</div>
                                        <small>Jag vet till stor del vad jag ska göra för att förbättra mina möjligheter att nå ett arbete</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="fourpurposeFulness" class="radio">
                                    <input id="fourpurposeFulness" v-model="note.purposeFulness" value="5" type="radio" name="purposeFulness" />
                                        <div>😀</div>
                                        <small>Jag vet precis vad jag ska göra för att nå  ett arbete</small>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content has-text-centered">
                        <p class="title">Samarbetsförmåga</p>
                        <p class="subtitle">Hur bra är du på att arbeta med andra?</p>

                        <div class="columns">
                            <div class="column">
                                <label for="zeroabilityToWorkTogether" class="radio">
                                    <input id="zeroabilityToWorkTogether" v-model="note.abilityToWorkTogether" value="1" type="radio" name="abilityToWorkTogether" />
                                        <div>😢</div>
                                        <small>Jag tycker det är väldigt svårt att samarbeta med andra</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="oneabilityToWorkTogether" class="radio">
                                    <input id="oneabilityToWorkTogether" v-model="note.abilityToWorkTogether" value="2" type="radio" name="abilityToWorkTogether" />
                                        <div>🙁</div>
                                        <small>Jag har ofta svårt att samarbeta med andra</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="twoabilityToWorkTogether" class="radio">
                                    <input id="twoabilityToWorkTogether" v-model="note.abilityToWorkTogether" value="3" type="radio" name="abilityToWorkTogether" />
                                        <div>😐</div>
                                        <small>Det varierar. Ibland är det lätt och ibland är det svårt att samarbeta med andra</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="threeabilityToWorkTogether" class="radio">
                                    <input id="threeabilityToWorkTogether" v-model="note.abilityToWorkTogether" value="4" type="radio" name="abilityToWorkTogether" />
                                        <div>🙂</div>
                                        <small>Jag tycker oftast att det är lätt att samarbeta med andra</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="fourabilityToWorkTogether" class="radio">
                                    <input id="fourabilityToWorkTogether" v-model="note.abilityToWorkTogether" value="5" type="radio" name="abilityToWorkTogether" />
                                        <div>😀</div>
                                        <small>Jag tycker att det är väldigt lätt att samarbeta med andra</small>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content has-text-centered">
                        <p class="title">Hantering av vardagen</p>
                        <p class="subtitle">Har du tid i vardagen att fokusera på att få ett arbete/praktik eller utbildning?</p>

                        <div class="columns">
                            <div class="column">
                                <label for="zerohandlingOfEverydayLife" class="radio">
                                    <input id="zerohandlingOfEverydayLife" v-model="note.handlingOfEverydayLife" value="1" type="radio" name="handlingOfEverydayLife" />
                                        <div>😢</div>
                                        <small>Jag har nästan aldrig tid att fokusera på det</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="onehandlingOfEverydayLife" class="radio">
                                    <input id="onehandlingOfEverydayLife" v-model="note.handlingOfEverydayLife" value="2" type="radio" name="handlingOfEverydayLife" />
                                        <div>🙁</div>
                                        <small>Jag har oftast inte tid att fokusera på det</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="twohandlingOfEverydayLife" class="radio">
                                    <input id="twohandlingOfEverydayLife" v-model="note.handlingOfEverydayLife" value="3" type="radio" name="handlingOfEverydayLife" />
                                        <div>😐</div>
                                        <small>Det varierar. Ibland har jag tid och ibland har jag inte tid</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="threehandlingOfEverydayLife" class="radio">
                                    <input id="threehandlingOfEverydayLife" v-model="note.handlingOfEverydayLife" value="4" type="radio" name="handlingOfEverydayLife" />
                                        <div>🙂</div>
                                        <small>Jag har mestadels tid att fokusera på det</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="fourhandlingOfEverydayLife" class="radio">
                                    <input id="fourhandlingOfEverydayLife" v-model="note.handlingOfEverydayLife" value="5" type="radio" name="handlingOfEverydayLife" />
                                        <div>😀</div>
                                        <small>Jag har definitivt tid att fokusera på det</small>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content has-text-centered">
                        <p class="title">Hälsotillstånd</p>
                        <p class="subtitle">Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?</p>

                        <div class="columns">
                            <div class="column">
                                <label for="zerostateOfHealth" class="radio">
                                    <input id="zerostateOfHealth" v-model="note.stateOfHealth" value="1" type="radio" name="stateOfHealth" />
                                        <div>😢</div>
                                        <small>Mitt hälsotillstånd hindrar mig helt från att arbeta eller studera</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="onestateOfHealth" class="radio">
                                    <input id="onestateOfHealth" v-model="note.stateOfHealth" value="2" type="radio" name="stateOfHealth" />
                                        <div>🙁</div>
                                        <small>Mitt hälsotillstånd sätter enorma begränsningar för att jag ska kunna arbeta eller studera. Jag kanske kan arbeta max ett par timmar</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="twostateOfHealth" class="radio">
                                    <input id="twostateOfHealth" v-model="note.stateOfHealth" value="3" type="radio" name="stateOfHealth" />
                                        <div>😐</div>
                                        <small>Det varierar. Ibland är det svårt. Jag kanske kan ta ett deltidsarbete med rätt typ av hjälp och stöd</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="threestateOfHealth" class="radio">
                                    <input id="threestateOfHealth" v-model="note.stateOfHealth" value="4" type="radio" name="stateOfHealth" />
                                        <div>🙂</div>
                                        <small>Mitt hålsotillstånd hindrar mig inte från att arbeta, men kan ibland sätta begränsningar</small>
                                </label>
                            </div>
                            <div class="column">
                                <label for="fourstateOfHealth" class="radio">
                                    <input id="fourstateOfHealth" v-model="note.stateOfHealth" value="5" type="radio" name="stateOfHealth" />
                                        <div>😀</div>
                                        <small>Mitt hälsotillstånd hindar mig inte från att arbeta</small>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-content">
                        <p class="title">Hur söker du ett arbete?</p>
                        <p class="subtitle">Kryssa gärna i fler altenativ</p>

                        <div class="rows">
                            <div class="row my-2">
                                <label for="adverts" class="checkbox">
                                    <input id="adverts" v-model="note.adverts" type="checkbox" />
                                    Genom annonser i tidningar, tidskrifter och liknande
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="jobportal" class="checkbox">
                                    <input id="jobportal" v-model="note.jobportal" type="checkbox" />
                                    Genom jobbportaler via internet
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="employer" class="checkbox">
                                    <input id="employer" v-model="note.employer" type="checkbox" />
                                    Har kontaktat en arbetsgivare på eget initiativ <small>(ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)</small>
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="family" class="checkbox">
                                    <input id="family" v-model="note.family" type="checkbox" />
                                    Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="internship" class="checkbox">
                                    <input id="internship" v-model="note.internship" type="checkbox" />
                                    Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="staffingcompanies" class="checkbox">
                                    <input id="staffingcompanies" v-model="note.staffingcompanies" type="checkbox" />
                                    Bemanningsföretag, rekryteringsbyrå
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="socialmedia" class="checkbox">
                                    <input id="socialmedia" v-model="note.socialmedia" type="checkbox" />
                                    Social medier, Facebook och LinkedIn t.ex.
                                </label>
                            </div>
                            <div class="row my-2">
                                <label for="notlookingforwork" class="checkbox">
                                    <input id="notlookingforwork" v-model="note.notlookingforwork" type="checkbox" />
                                    Jag letar inte efter arbete <small>(eftersom jag är sjuk eller av andra skäl)</small>
                                </label>
                            </div>
                            <div class="row my-2">
                                <div class="control">
                                    <input id="otherways" v-model="note.otherways" class="input" type="text" placeholder="Annat sätt - fritext" />
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
                -->
            </div>
            
        </div>

        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons" />
            </div>
        </div>
      </div>
</template>

<script setup>

//PROPS
    const props = defineProps({
        note: {
            type: Object,
            default: {
                beliefInWork: null,
                laborMarket: null,
                purposeFulness: null,
                abilityToWorkTogether: null,
                handlingOfEverydayLife: null,
                stateOfHealth: null
            }
        },
        bgColor: {
            type: String,
            default: 'success'
        },
        label: {
            type: String,
        }
    })

</script>

<style scoped>
*, *::before, *::after {
    box-sizing: border-box;
}
@media screen and (max-width: 768px) {

	.radio.ml-5 {
	    margin-left: 0 !important;
	}
    .mr-3 {
        margin-right: 0 !important;
    }
     .card-content {
        padding: .5rem !important;
     }


}
label > div {
    padding: .2rem .5rem;
    
}
label > div > div {
    font-size: 2rem;
    height: 2.8rem;
}
input[type='radio'] {
    display: none;
}
input[type='radio']:not(:checked)+div {
    filter: grayscale(100%);
    /* border: 2px solid transparent; */
}
input[type='radio']:checked+div {
    border: 2px solid green;
    -webkit-box-shadow: 4px 5px 6px -4px #000000; 
    box-shadow: 4px 5px 6px -4px #000000;
}
</style>