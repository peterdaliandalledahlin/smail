import { createApp, markRaw, ref } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
      // Focus the element
      el.focus()
    }
  })

let currentLanguage = ref('sv')
app.provide(currentLanguage)

const formDefinition = {
    estimations: [
        { 
            title: 'ESTIMATION1_TITLE',
            subtitle: 'ESTIMATION1_SUBTITLE',
            propertyName: 'beliefInWork',
            options: [
                { value: 1, option: 'ESTIMATION1_OPTION1'},
                { value: 2, option: 'ESTIMATION1_OPTION2'},
                { value: 3, option: 'ESTIMATION1_OPTION3'},
                { value: 4, option: 'ESTIMATION1_OPTION4'},
                { value: 5, option: 'ESTIMATION1_OPTION5'},
            ]
        },
        { 
            title: 'ESTIMATION2_TITLE',
            subtitle: 'ESTIMATION2_SUBTITLE',
            propertyName: 'laborMarket',
            options: [
                { value: 1, option: 'ESTIMATION2_OPTION1'},
                { value: 2, option: 'ESTIMATION2_OPTION2'},
                { value: 3, option: 'ESTIMATION2_OPTION3'},
                { value: 4, option: 'ESTIMATION2_OPTION4'},
                { value: 5, option: 'ESTIMATION2_OPTION5'},
            ]
        },
        { 
            title: 'ESTIMATION3_TITLE',
            subtitle: 'ESTIMATION3_SUBTITLE',
            propertyName: 'purposeFulness',
            options: [
                { value: 1, option: 'ESTIMATION3_OPTION1'},
                { value: 2, option: 'ESTIMATION3_OPTION2'},
                { value: 3, option: 'ESTIMATION3_OPTION3'},
                { value: 4, option: 'ESTIMATION3_OPTION4'},
                { value: 5, option: 'ESTIMATION3_OPTION5'},
            ]
        },
        { 
            title: 'ESTIMATION4_TITLE',
            subtitle: 'ESTIMATION4_SUBTITLE',
            propertyName: 'abilityToWorkTogether',
            options: [
                { value: 1, option: 'ESTIMATION4_OPTION1'},
                { value: 2, option: 'ESTIMATION4_OPTION2'},
                { value: 3, option: 'ESTIMATION4_OPTION3'},
                { value: 4, option: 'ESTIMATION4_OPTION4'},
                { value: 5, option: 'ESTIMATION4_OPTION5'},
            ]
        },
        { 
            title: 'ESTIMATION5_TITLE',
            subtitle: 'ESTIMATION5_SUBTITLE',
            propertyName: 'handlingOfEverydayLife',
            options: [
                { value: 1, option: 'ESTIMATION5_OPTION1'},
                { value: 2, option: 'ESTIMATION5_OPTION2'},
                { value: 3, option: 'ESTIMATION5_OPTION3'},
                { value: 4, option: 'ESTIMATION5_OPTION4'},
                { value: 5, option: 'ESTIMATION5_OPTION5'},
            ]
        },
        { 
            title: 'ESTIMATION6_TITLE',
            subtitle: 'ESTIMATION6_SUBTITLE',
            propertyName: 'stateOfHealth',
            options: [
                { value: 1, option: 'ESTIMATION6_OPTION1'},
                { value: 2, option: 'ESTIMATION6_OPTION2'},
                { value: 3, option: 'ESTIMATION6_OPTION3'},
                { value: 4, option: 'ESTIMATION6_OPTION4'},
                { value: 5, option: 'ESTIMATION6_OPTION5'},
            ]
        },
    ],
    questions: [
        {
            propertyName: 'adverts',
            question: 'QUESTION1',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'jobportal',
            question: 'QUESTION2',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'employer',
            question: 'QUESTION3',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'family',
            question: 'QUESTION4',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'internship',
            question: 'QUESTION5',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'staffingcompanies',
            question: 'QUESTION6',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'socialmedia',
            question: 'QUESTION7',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'notlookingforwork',
            question: 'QUESTION8',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'otherways',
            question: 'QUESTION9',
            type: 'text',
            class: 'input is-success'
        },
    ]
  }
app.provide('formDefinition', formDefinition)

const stringsSV = {
    ESTIMATION1_TITLE: 'Individens tro på att få ett arbete',
    ESTIMATION1_SUBTITLE: 'Tror du att du kan klara av att arbeta?',
    ESTIMATION1_OPTION1: 'Jag tror inte att jag kan klara av att arbeta',
    ESTIMATION1_OPTION2: 'Jag är väldigt osäker på om jag kan klara av att arbeta',
    ESTIMATION1_OPTION3: 'Jag är osäker på om jag kan klara av att arbeta',
    ESTIMATION1_OPTION4: 'Jag är någorlunda säker på att jag kan klara av att arbeta',
    ESTIMATION1_OPTION5: 'Jag är helt säker på att jag kan klara av att arbeta',
    ESTIMATION2_TITLE: 'Kunskap om arbetsmarknaden',
    ESTIMATION2_SUBTITLE: 'Tror du att dina kompetenser är till nytta på en arbetsplats?',
    ESTIMATION2_OPTION1: 'Jag tror inte att jag har någon kunskap att erbjuda en arbetsplats',
    ESTIMATION2_OPTION2: 'Jag tvivlar starkt på att jag har någon kunskap att erbjuda en arbetsplats',
    ESTIMATION2_OPTION3: 'Det varierar. Ibland blir jag osäker på om jag har något att erbjuda eller inte',
    ESTIMATION2_OPTION4: 'Jag är för det mesta säker på att jag har något att erbjuda en arbetsplats',
    ESTIMATION2_OPTION5: 'Jag är säker på att jag har massor att erbjuda en arbetsplats',
    ESTIMATION3_TITLE: 'Målmedvetenhet',
    ESTIMATION3_SUBTITLE: 'Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?',
    ESTIMATION3_OPTION1: 'Jag vet inte hur jag ska göra för att nå ett arbete',
    ESTIMATION3_OPTION2: 'Jag vet till viss del vad jag ska för att förbättra mina möljigheter att nå ett arbete',
    ESTIMATION3_OPTION3: 'Jag vet ganska väl vad jag ska göra för att förbättra mina möjligheter att nå ett arbete',
    ESTIMATION3_OPTION4: 'Jag vet till stor del vad jag ska göra för att förbättra mina möjligheter att nå ett arbete',
    ESTIMATION3_OPTION5: 'Jag vet precis vad jag ska göra för att nå ett arbete',
    ESTIMATION4_TITLE: 'Samarbetsförmåga',
    ESTIMATION4_SUBTITLE: 'Hur bra är du på att arbeta med andra?',
    ESTIMATION4_OPTION1: 'Jag tycker det är väldigt svårt att samarbeta med andra',
    ESTIMATION4_OPTION2: 'Jag har ofta svårt att samarbeta med andra',
    ESTIMATION4_OPTION3: 'Det varierar. Ibland är det lätt och ibland är det svårt att samarbeta med andra',
    ESTIMATION4_OPTION4: 'Jag tycker oftast att det är lätt att samarbeta med andra',
    ESTIMATION4_OPTION5: 'Jag tycker att det är väldigt lätt att samarbeta med andra',
    ESTIMATION5_TITLE: 'Hanteringen av vardagen',
    ESTIMATION5_SUBTITLE: 'Har du tid i vardagen att fokusera på att få ett arbete/praktik eller utbildning?',
    ESTIMATION5_OPTION1: 'Jag har nästan aldrig tid att fokusera på det',
    ESTIMATION5_OPTION2: 'Jag har oftast inte tid att fokusera på det',
    ESTIMATION5_OPTION3: 'Det varierar. Ibland har jag tid och ibland har jag inte tid',
    ESTIMATION5_OPTION4: 'Jag har mestadels tid att fokusera på det',
    ESTIMATION5_OPTION5: 'Jag har definitivt tid att fokusera på det',
    ESTIMATION6_TITLE: 'Hälsotillstånd',
    ESTIMATION6_SUBTITLE: 'Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?',
    ESTIMATION6_OPTION1: 'Mitt hälsotillstånd hindrar mig helt från att arbeta eller studera',
    ESTIMATION6_OPTION2: 'Mitt hälsotillstånd sätter enorma begränsningar för att jag ska kunna arbeta eller studera. Jag kanske kan arbeta max ett par timmar',
    ESTIMATION6_OPTION3: 'Det varierar. Ibland är det svårt. Jag kanske kan ta ett deltidsarbete med rätt typ av hjälp och stöd',
    ESTIMATION6_OPTION4: 'Mitt hälsotillstånd hindrar mig inte från att arbeta, men kan ibland sätta begränsningar',
    ESTIMATION6_OPTION5: 'Mitt hälsotillstånd hindrar mig inte från att arbeta',
    QUESTION1: 'Genom annonser i tidningar, tidskrifter och liknande',
    QUESTION2: 'Genom jobbportaler via internet',
    QUESTION3: 'Har kontaktat en arbetsgivare på eget initiativ (ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)',
    QUESTION4: 'Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete',
    QUESTION5: 'Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över',
    QUESTION6: 'Bemanningsföretag, rekryteringsbyrå',
    QUESTION7: 'Social medier, Facebook och LinkedIn t.ex.',
    QUESTION8: 'Jag letar inte efter arbete (eftersom jag är sjuk eller av andra skäl)',
    QUESTION9: ''
}

const stringsEN = {
    ESTIMATION1_TITLE: 'The individuals belief in getting a job',
    ESTIMATION1_SUBTITLE: 'Do you think that you can manage to work?',
    ESTIMATION1_OPTION1: 'I do not think I can work',
    ESTIMATION1_OPTION2: 'I am very unsure if I can manage to work',
    ESTIMATION1_OPTION3: 'I am not sure if I can work',
    ESTIMATION1_OPTION4: 'I am reasonably sure I can work',
    ESTIMATION1_OPTION5: 'I am pretty sure I can work',
    ESTIMATION2_TITLE: 'Knowledge of the labor market',
    ESTIMATION2_SUBTITLE: 'Do you think that your skills are useful in a workplace',
    ESTIMATION2_OPTION1: 'I do not think I have any knowledge to offer a workplace',
    ESTIMATION2_OPTION2: 'I strongly doubt that I have any knowledge to offer a workplace',
    ESTIMATION2_OPTION3: 'It varies. Sometimes I get unsure if I have something to offer or not',
    ESTIMATION2_OPTION4: 'I am mostly sure I have something to offer a workplace',
    ESTIMATION2_OPTION5: 'I am sure I have a lot to offer to a workplace',
    ESTIMATION3_TITLE: 'Purposefulness',
    ESTIMATION3_SUBTITLE: 'Do you know what to do to improve your chances of getting a job?',
    ESTIMATION3_OPTION1: 'I do not know what to do to get a job',
    ESTIMATION3_OPTION2: 'I know to some extent what I need to do to improve my chances of getting a job',
    ESTIMATION3_OPTION3: 'I know pretty well what to do to improve my chances of getting a job',
    ESTIMATION3_OPTION4: 'I largely know what to do to improve my chances of getting a job',
    ESTIMATION3_OPTION5: 'I know exactly what I need to do to get a job',
    ESTIMATION4_TITLE: 'Ability to cooperate',
    ESTIMATION4_SUBTITLE: 'How good are you at working with others?',
    ESTIMATION4_OPTION1: 'I find it very difficult to collaborate with others',
    ESTIMATION4_OPTION2: 'I often find it difficult to collaborate with others',
    ESTIMATION4_OPTION3: 'It varies. Sometimes its easy and sometimes its hard to work with others',
    ESTIMATION4_OPTION4: 'I usually find it easy to collaborate with others',
    ESTIMATION4_OPTION5: 'I find it very easy to collaborate with others',
    ESTIMATION5_TITLE: 'The management of everyday life',
    ESTIMATION5_SUBTITLE: 'Do you have time in your everyday life to focus on getting a job/internship or education?',
    ESTIMATION5_OPTION1: 'I almost never have time to focus on it',
    ESTIMATION5_OPTION2: 'I usually dont have time to focus on it',
    ESTIMATION5_OPTION3: 'It varies. Sometimes I have time and sometimes I dont',
    ESTIMATION5_OPTION4: 'I mostly have time to focus on that',
    ESTIMATION5_OPTION5: 'I definitely have time to focus on it',
    ESTIMATION6_TITLE: 'State of health',
    ESTIMATION6_SUBTITLE: 'How do you rate your general state of health in relation to working?',
    ESTIMATION6_OPTION1: 'My state of health completely prevents me from working or studying',
    ESTIMATION6_OPTION2: 'My state of health places enormous limitations on my ability to work or study. I might be able to work a couple of hours max',
    ESTIMATION6_OPTION3: 'It varies. Sometimes it is difficult. I might be able to take part-time work with the right kind of help and support',
    ESTIMATION6_OPTION4: 'My state of health does not prevent me from working, but can sometimes limit it',
    ESTIMATION6_OPTION5: 'My state of health does not prevent me from working',
    QUESTION1: 'Through advertisements in newspapers, magazines and the like',
    QUESTION2: 'Through job portals via the internet',
    QUESTION3: 'Have contacted an employer on your own initiative (e.g. phoned, sent in a spontaneous application or visited their workplace',
    QUESTION4: 'Have asked my family, friends and acquaintances if they know anyone who can help me find a job',
    QUESTION5: 'Have made my internship aware that I would like to have employment after the internship is over',
    QUESTION6: 'Staffing company, recruitment agency',
    QUESTION7: 'Social media, Facebook and LinkedIn e.g.',
    QUESTION8: 'I am not looking for work (because I am sick or for other reasons)',
    QUESTION9: ''
}

const stringsAR = {
    ESTIMATION1_TITLE: 'إيمان الأفراد بالحصول على وظيفة',
    ESTIMATION1_SUBTITLE: 'هل تعتقد أنه يمكنك إدارة العمل؟',
    ESTIMATION1_OPTION1: 'لا أعتقد أنني أستطيع العمل',
    ESTIMATION1_OPTION2: 'أنا غير متأكد مما إذا كان بإمكاني إدارة العمل',
    ESTIMATION1_OPTION3: 'لست متأكدًا مما إذا كان بإمكاني العمل',
    ESTIMATION1_OPTION4: 'أنا متأكد بشكل معقول من أنني أستطيع العمل',
    ESTIMATION1_OPTION5: 'أنا متأكد من أنني أستطيع العمل',
    ESTIMATION2_TITLE: 'معرفة سوق العمل',
    ESTIMATION2_SUBTITLE: 'هل تعتقد أن مهاراتك مفيدة في مكان العمل؟',
    ESTIMATION2_OPTION1: 'لا أعتقد أن لدي أي معرفة لتقديم مكان عمل',
    ESTIMATION2_OPTION2: '{القيمة: 2 ، الوصف: "أشك بشدة في أن لدي أي معرفة لتقديم مكان عمل"}،',
    ESTIMATION2_OPTION3: 'أنه يختلف. أحيانًا لا أكون متأكدًا مما إذا كان لدي شيء لأقدمه أم لا',
    ESTIMATION2_OPTION4: 'أنا متأكد في الغالب من أن لدي ما أقدمه لمكان العمل',
    ESTIMATION2_OPTION5: 'أنا متأكد من أن لدي الكثير لأقدمه لمكان العمل',
    ESTIMATION3_TITLE: 'العزيمة',
    ESTIMATION3_SUBTITLE: 'هل تعرف ماذا تفعل لتحسين فرصك في الحصول على وظيفة؟',
    ESTIMATION3_OPTION1: 'لا أعرف ماذا أفعل للحصول على وظيفة',
    ESTIMATION3_OPTION2: 'أعرف إلى حد ما ما يجب أن أفعله لتحسين فرصي في الحصول على وظيفة',
    ESTIMATION3_OPTION3: 'أعرف جيدًا ما يجب فعله لتحسين فرصي في الحصول على وظيفة',
    ESTIMATION3_OPTION4: 'أنا أعرف إلى حد كبير ما يجب القيام به لتحسين فرصي في الحصول على وظيفة',
    ESTIMATION3_OPTION5: 'أعرف بالضبط ما يجب علي فعله للحصول على وظيفة',
    ESTIMATION4_TITLE: 'القدرة على التعاون',
    ESTIMATION4_SUBTITLE: 'ما مدى براعتك في العمل مع الآخرين؟',
    ESTIMATION4_OPTION1: 'أجد صعوبة بالغة في التعاون مع الآخرين',
    ESTIMATION4_OPTION2: 'غالبًا ما أجد صعوبة في التعاون مع الآخرين',
    ESTIMATION4_OPTION3: 'أنه يختلف. أحيانًا يكون من السهل وأحيانًا من الصعب العمل مع الآخرين',
    ESTIMATION4_OPTION4: 'عادة ما أجد أنه من السهل التعاون مع الآخرين',
    ESTIMATION4_OPTION5: 'أجد أنه من السهل جدًا التعاون مع الآخرين',
    ESTIMATION5_TITLE: 'إدارة الحياة اليومية',
    ESTIMATION5_SUBTITLE: 'هل لديك وقت في حياتك اليومية للتركيز على الحصول على وظيفة / تدريب داخلي أو تعليم؟',
    ESTIMATION5_OPTION1: 'لم يكن لدي وقت للتركيز عليه',
    ESTIMATION5_OPTION2: 'أنا عادة لا أملك الوقت للتركيز عليه',
    ESTIMATION5_OPTION3: 'أنه يختلف. أحيانًا يكون لدي وقت وأحيانًا لا أفعل',
    ESTIMATION5_OPTION4: 'لدي الوقت في الغالب للتركيز على ذلك',
    ESTIMATION5_OPTION5: 'بالتأكيد لدي وقت للتركيز عليه', 
    ESTIMATION6_TITLE: 'الحالة الصحية',
    ESTIMATION6_SUBTITLE: 'كيف تقيم حالتك الصحية العامة فيما يتعلق بالعمل؟',
    ESTIMATION6_OPTION1: 'حالتي الصحية تمنعني تمامًا من العمل أو الدراسة',
    ESTIMATION6_OPTION2: 'تضع حالتي الصحية قيودًا هائلة على قدرتي على العمل أو الدراسة. قد أكون قادرًا على العمل بضع ساعات كحد أقصى',
    ESTIMATION6_OPTION3: 'أنه يختلف. في بعض الأحيان يكون من الصعب. قد أكون قادرًا على القيام بعمل بدوام جزئي بالنوع المناسب من المساعدة والدعم',
    ESTIMATION6_OPTION4: 'لا تمنعني حالتي الصحية من العمل ، لكنها قد تفرض قيودًا في بعض الأحيان',
    ESTIMATION6_OPTION5: 'حالتي الصحية لا تمنعني من العمل',
    QUESTION1: 'من خلال الإعلانات في الصحف والمجلات وما في حكمها',
    QUESTION2: 'من خلال بوابات الوظائف عبر الإنترنت',
    QUESTION3: 'اتصلت بصاحب عمل بمبادرتك الخاصة (على سبيل المثال ، اتصلت هاتفيا ، أو أرسلت في طلب عفوي ، أو قم بزيارة مكان عملها)',
    QUESTION4: 'سألت عائلتي وأصدقائي ومعارفي إذا كانوا يعرفون أي شخص يمكنه مساعدتي في العثور على وظيفة',
    QUESTION5: 'لقد جعلت فترة تدريبي على علم بأنني أرغب في الحصول على عمل بعد انتهاء فترة التدريب',
    QUESTION6: 'شركة توظيف ، وكالة توظيف',
    QUESTION7: 'وسائل التواصل الاجتماعي و Facebook و LinkedIn على سبيل المثال',
    QUESTION8: 'لا أبحث عن عمل (لأنني مريض أو لأسباب أخرى)',
    QUESTION9: '',
}

const stringsSO = {
    ESTIMATION1_TITLE: 'Shakhsiyaadka waxay aaminsan yihiin inay shaqo helaan',
    ESTIMATION1_SUBTITLE: 'Ma u malaynaysaa inaad shaqayn karto?',
    ESTIMATION1_OPTION1: 'Uma malaynayo inaan shaqayn karo',
    ESTIMATION1_OPTION2: 'Aad ayaan u hubin in aan awoodi karo inaan shaqeeyo',
    ESTIMATION1_OPTION3: 'Ma hubo in aan shaqayn karo',
    ESTIMATION1_OPTION4: 'Waxaan si macquul ah u hubaa inaan shaqayn karo',
    ESTIMATION1_OPTION5: 'Waan hubaa inaan shaqayn karo',
    ESTIMATION2_TITLE: 'Aqoonta suuqa shaqada',
    ESTIMATION2_SUBTITLE: 'Ma u malaynaysaa in xirfadahaagu ay faaiido u leeyihiin goobta shaqada?',
    ESTIMATION2_OPTION1: 'Uma maleynayo inaan haysto wax aqoon ah oo aan ku bixiyo goob shaqo',
    ESTIMATION2_OPTION2: 'Waxaan aad uga shakisanahay inaan leeyahay wax aqoon ah oo aan ku bixiyo goob shaqo',
    ESTIMATION2_OPTION3: 'Way kala duwan tahay. Mararka qaarkood ma hubo in aan haysto wax aan bixiyo iyo in kale',
    ESTIMATION2_OPTION4: 'Waxaan inta badan hubaa inaan haysto wax aan ku bixiyo goob shaqo',
    ESTIMATION2_OPTION5: 'Waxaan hubaa in aan haysto wax badan oo aan ku bixiyo goob shaqo',
    ESTIMATION3_TITLE: 'Ujeedo',
    ESTIMATION3_SUBTITLE: 'Ma garanaysaa waxaad samayso si aad u wanaajiso fursadahaaga shaqo?',
    ESTIMATION3_OPTION1: 'Ma garanayo waxaan sameeyo si aan shaqo u helo',
    ESTIMATION3_OPTION2: 'Waan ogahay ilaa xad waxa aan u baahanahay inaan sameeyo si aan u wanaajiyo fursadahayga shaqo',
    ESTIMATION3_OPTION3: 'Si fiican ayaan u garanayaa waxa aan sameeyo si aan u wanaajiyo fursadahayga shaqo',
    ESTIMATION3_OPTION4: 'Inta badan waan garanayaa waxa aan sameeyo si aan u wanaajiyo fursadahayga shaqo',
    ESTIMATION3_OPTION5: 'Waan garanayaa dhab ahaan waxa aan u baahanahay inaan sameeyo si aan shaqo u helo',
    ESTIMATION4_TITLE: 'Awooda iskaashi',
    ESTIMATION4_SUBTITLE: 'Sidee ugu fiican tahay inaad la shaqeyso dadka kale?',
    ESTIMATION4_OPTION1: 'Aad ayay iigu adagtahay in aan la shaqeeyo dadka kale',
    ESTIMATION4_OPTION2: 'Inta badan way igu adagtahay in aan la shaqeeyo dadka kale',
    ESTIMATION4_OPTION3: 'Way kala duwan tahay. Mar way fududahay marna way adagtahay in lala shaqeeyo dadka kale',
    ESTIMATION4_OPTION4: 'Caadi ahaan way ii fududahay inaan la shaqeeyo dadka kale',
    ESTIMATION4_OPTION5: 'Aad ayay ii fududdahay inaan la shaqeeyo dadka kale',
    ESTIMATION5_TITLE: 'Maamulka nolol maalmeedka',
    ESTIMATION5_SUBTITLE: 'Ma haysataa wakhti nolol maalmeedkaaga ah oo aad diirada saarto sidii aad shaqo/barasho shaqo ama waxbarasho u heli lahayd?',
    ESTIMATION5_OPTION1: 'Ku dhawaad marnaba ma haysto wakhti aan diirada saaro',
    ESTIMATION5_OPTION2: 'Inta badan ma haysto wakhti aan diirada saaro',
    ESTIMATION5_OPTION3: 'Way kala duwan tahay. Mar waxaan haystaa waqti, marna ma hayo',
    ESTIMATION5_OPTION4: 'Inta badan waxaan haystaa waqti aan diirada saaro',
    ESTIMATION5_OPTION5: 'Xaqiiqdii waxaan haystaa wakhti aan diirada saaro',
    ESTIMATION6_TITLE: 'Xaalada caafimaad',
    ESTIMATION6_SUBTITLE: 'Sideed u qiimeysaa xaaladaada guud ee caafimaadka ee la xidhiidha shaqada?',
    ESTIMATION6_OPTION1: 'Xaaladayda caafimaad ayaa gabi ahaanba iga diiday in aan shaqeeyo ama aan wax barto',
    ESTIMATION6_OPTION2: 'Xaaladdayda caafimaadku waxay xaddidaysaa awooddayda shaqo ama waxbarasho. Waxa laga yaabaa in aan shaqeeyo dhawr saacadood',
    ESTIMATION6_OPTION3: 'Way kala duwan tahay. Mararka qaarkood way adagtahay. Waxa laga yaabaa in aan qaato shaqo waqti-dhiman ah aniga oo haysta nooca saxda ah ee kaalmada iyo taageerada',
    ESTIMATION6_OPTION4: 'Xaaladdayda caafimaad igama hor istaagto inaan shaqeeyo, laakiin waxay mararka qaarkood soo rogi kartaa xaddidaadyo',
    ESTIMATION6_OPTION5: 'Xaaladayda caafimaad igama hor istaagto inaan shaqeeyo',
    QUESTION1: 'Iyadoo loo marayo xayaysiisyada wargeysyada, majaladaha iyo wixii la mid ah',
    QUESTION2: 'Iyada oo loo marayo boggaga shaqada ee internetka',
    QUESTION3: 'La xidhiidh shaqo-bixiye iskiina',
    QUESTION4: 'Waxaan weydiiyay qoyskayga, saaxiibadayda iyo dadka aan naqaano haddii ay garanayaan qof iga caawin kara shaqo helida',
    QUESTION5: 'Waxaan ka dhigay internship-kayga in aan jeclaan lahaa in aan helo shaqo ka dib marka tababarku dhamaado',
    QUESTION6: 'Shirkadda shaqaalaha, wakaaladda qorista',
    QUESTION7: 'Baraha bulshada, Facebook iyo LinkedIn tusaale.',
    QUESTION8: 'Ma doonayo shaqo (sababtoo ah waan xanuunsanahay ama sababo kale dartood)',
    QUESTION9: '',
}

const localize = (stringId) => {
    let strings = null
    switch (currentLanguage.value) {
        case 'sv':
            strings = stringsSV; 
            break;
        case 'en':
            strings = stringsEN; 
            break;
        case 'ar':
            strings = stringsAR;
            break;
        case 'so':
            strings = stringsSO;
            break;
    }
    return strings[stringId];
}
        
app.provide('localize', localize)

app.provide('estimatesSWE', [
    {
        title: 'Individens tro på att få ett arbete',
        subtitle: 'Tror du att du kan klara av att arbeta?',
        propertyName: 'beliefInWork',
        options: [
            {value: 1, description: 'Jag tror inte att jag kan klara av att arbeta'},
            {value: 2, description: 'Jag är väldigt osäker på om jag kan klara av att arbeta'},
            {value: 3, description: 'Jag är osäker på om jag kan klara av att arbeta'},
            {value: 4, description: 'Jag är någorlunda säker på att jag kan klara av att arbeta'},
            {value: 5, description: 'Jag är helt säker på att jag kan klara av att arbeta'},
        ]
    },
    {
        title: 'Kunskap om arbetsmarknaden',
        subtitle: 'Tror du att dina kompetenser är till nytta på en arbetsplats?',
        propertyName: 'laborMarket',
        options: [
            {value: 1, description: 'Jag tror inte att jag har någon kunskap att erbjuda en arbetsplats'},
            {value: 2, description: 'Jag tvivlar starkt på att jag har någon kunskap att erbjuda en arbetsplats'},
            {value: 3, description: 'Det varierar. Ibland blir jag osäker på om jag har något att erbjuda eller inte'},
            {value: 4, description: 'Jag är för det mesta säker på att jag har något att erbjuda en arbetsplats'},
            {value: 5, description: 'Jag är säker på att jag har massor att erbjuda en arbetsplats'},
        ]    
    },
    {
        title: 'Målmedvetenhet',
        subtitle: 'Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?',
        propertyName: 'purposeFulness',
        options: [
            {value: 1, description: 'Jag vet inte hur jag ska göra för att nå ett arbete'},
            {value: 2, description: 'Jag vet till viss del vad jag ska för att förbättra mina möljigheter att nå ett arbete'},
            {value: 3, description: 'Jag vet ganska väl vad jag ska göra för att förbättra mina möjligheter att nå ett arbete'},
            {value: 4, description: 'Jag vet till stor del vad jag ska göra för att förbättra mina möjligheter att nå ett arbete'},
            {value: 5, description: 'Jag vet precis vad jag ska göra för att nå ett arbete'},
        ]    
    },
    {
        title: 'Samarbetsförmåga',
        subtitle: 'Hur bra är du på att arbeta med andra?',
        propertyName: 'abilityToWorkTogether',
        options: [
            {value: 1, description: 'Jag tycker det är väldigt svårt att samarbeta med andra'},
            {value: 2, description: 'Jag har ofta svårt att samarbeta med andra'},
            {value: 3, description: 'Det varierar. Ibland är det lätt och ibland är det svårt att samarbeta med andra'},
            {value: 4, description: 'Jag tycker oftast att det är lätt att samarbeta med andra'},
            {value: 5, description: 'Jag tycker att det är väldigt lätt att samarbeta med andra'},
        ]    
    },
    {
        title: 'Hanteringen av vardagen',
        subtitle: 'Har du tid i vardagen att fokusera på att få ett arbete/praktik eller utbildning?',
        propertyName: 'handlingOfEverydayLife',
        options: [
            {value: 1, description: 'Jag har nästan aldrig tid att fokusera på det'},
            {value: 2, description: 'Jag har oftast inte tid att fokusera på det'},
            {value: 3, description: 'Det varierar. Ibland har jag tid och ibland har jag inte tid'},
            {value: 4, description: 'Jag har mestadels tid att fokusera på det'},
            {value: 5, description: 'Jag har definitivt tid att fokusera på det'},
        ]    
    },
    {
        title: 'Hälsotillstånd',
        subtitle: 'Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?',
        propertyName: 'stateOfHealth',
        options: [
            {value: 1, description: 'Mitt hälsotillstånd hindrar mig helt från att arbeta eller studera'},
            {value: 2, description: 'Mitt hälsotillstånd sätter enorma begränsningar för att jag ska kunna arbeta eller studera. Jag kanske kan arbeta max ett par timmar'},
            {value: 3, description: 'Det varierar. Ibland är det svårt. Jag kanske kan ta ett deltidsarbete med rätt typ av hjälp och stöd'},
            {value: 4, description: 'Mitt hälsotillstånd hindrar mig inte från att arbeta, men kan ibland sätta begränsningar'},
            {value: 5, description: 'Mitt hälsotillstånd hindrar mig inte från att arbeta'},
        ]    
    },
])

app.provide('estimatesGBR', [
    {
        title: 'The individuals belief in getting a job',
        subtitle: 'Do you think that you can manage to work?',
        propertyName: 'beliefInWork',
        options: [
            {value: 1, description: 'I do not think I can work'},
            {value: 2, description: 'I am very unsure if I can manage to work'},
            {value: 3, description: 'I am not sure if I can work'},
            {value: 4, description: 'I am reasonably sure I can work'},
            {value: 5, description: 'I am pretty sure I can work'},
        ]
    },
    {
        title: 'Knowledge of the labor market',
        subtitle: 'Do you think that your skills are useful in a workplace?',
        propertyName: 'laborMarket',
        options: [
            {value: 1, description: 'I do not think I have any knowledge to offer a workplace'},
            {value: 2, description: 'I strongly doubt that I have any knowledge to offer a workplace'},
            {value: 3, description: 'It varies. Sometimes I get unsure if I have something to offer or not'},
            {value: 4, description: 'I am mostly sure I have something to offer a workplace'},
            {value: 5, description: 'I am sure I have a lot to offer to a workplace'},
        ]    
    },
    {
        title: 'Purposefulness',
        subtitle: 'Do you know what to do to improve your chances of getting a job?',
        propertyName: 'purposeFulness',
        options: [
            {value: 1, description: 'I do not know what to do to get a job'},
            {value: 2, description: 'I know to some extent what I need to do to improve my chances of getting a job'},
            {value: 3, description: 'I know pretty well what to do to improve my chances of getting a job'},
            {value: 4, description: 'I largely know what to do to improve my chances of getting a job'},
            {value: 5, description: 'I know exactly what I need to do to get a job'},
        ]    
    },
    {
        title: 'Ability to cooperate',
        subtitle: 'How good are you at working with others?',
        propertyName: 'abilityToWorkTogether',
        options: [
            {value: 1, description: 'I find it very difficult to collaborate with others'},
            {value: 2, description: 'I often find it difficult to collaborate with others'},
            {value: 3, description: 'It varies. Sometimes its easy and sometimes its hard to work with others'},
            {value: 4, description: 'I usually find it easy to collaborate with others'},
            {value: 5, description: 'I find it very easy to collaborate with others'},
        ]    
    },
    {
        title: 'Hanteringen av vardagen',
        subtitle: 'Har du tid i vardagen att fokusera på att få ett arbete/praktik eller utbildning?',
        propertyName: 'handlingOfEverydayLife',
        options: [
            {value: 1, description: 'Jag har nästan aldrig tid att fokusera på det'},
            {value: 2, description: 'Jag har oftast inte tid att fokusera på det'},
            {value: 3, description: 'Det varierar. Ibland har jag tid och ibland har jag inte tid'},
            {value: 4, description: 'Jag har mestadels tid att fokusera på det'},
            {value: 5, description: 'Jag har definitivt tid att fokusera på det'},
        ]    
    },
    {
        title: 'Hälsotillstånd',
        subtitle: 'Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?',
        propertyName: 'stateOfHealth',
        options: [
            {value: 1, description: 'Mitt hälsotillstånd hindrar mig helt från att arbeta eller studera'},
            {value: 2, description: 'Mitt hälsotillstånd sätter enorma begränsningar för att jag ska kunna arbeta eller studera. Jag kanske kan arbeta max ett par timmar'},
            {value: 3, description: 'Det varierar. Ibland är det svårt. Jag kanske kan ta ett deltidsarbete med rätt typ av hjälp och stöd'},
            {value: 4, description: 'Mitt hälsotillstånd hindrar mig inte från att arbeta, men kan ibland sätta begränsningar'},
            {value: 5, description: 'Mitt hälsotillstånd hindar mig inte från att arbeta'},
        ]    
    },
])

let myGlobalVariable = ref('smiley')
app.provide('myGlobalVariable', myGlobalVariable)

//app.config.globalProperties.iconMode = 'smiley'

app.config.globalProperties = {

    iconMode: 'smiley',

    $filters: {
    
    gradeIcon(value) {
        if(myGlobalVariable.value == 'smiley'){
            switch (value) {
                case 1:
                    return '😢'
                case 2:
                    return '🙁'
                case 3:
                    return '😐'
                case 4:
                    return '🙂'
                case 5:
                    return '😀'
                default:
                   return 'No smiley...'
                break;
            }
        }else if(myGlobalVariable.value == 'number'){
            switch (value) {
                case 1:
                    return '1️⃣'
                case 2:
                    return '2️⃣'
                case 3:
                    return '3️⃣'
                case 4:
                    return '4️⃣'
                case 5:
                    return '5️⃣'
                default:
                   return 'No smiley...'
                break;
            }
        }
    }
    },
    multipleChoiceOptions: [
        {
            propertyName: 'adverts',
            description: 'Genom annonser i tidningar, tidskrifter och liknande',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'jobportal',
            description: 'Genom jobbportaler via internet',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'employer',
            description: 'Har kontaktat en arbetsgivare på eget initiativ (ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'family',
            description: 'Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'internship',
            description: 'Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'staffingcompanies',
            description: 'Bemanningsföretag, rekryteringsbyrå',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'socialmedia',
            description: 'Social medier, Facebook och LinkedIn t.ex.',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'notlookingforwork',
            description: 'Jag letar inte efter arbete (eftersom jag är sjuk eller av andra skäl)',
            type: 'checkbox',
            class: 'checkbox'
        },
        {
            propertyName: 'otherways',
            description: '',
            type: 'text',
            class: 'input is-success'
        },
    ]
  }

// app.config.globalProperties.$filters = {
//     smiley(value) {
//         switch (value) {
//             case 1:
//                 return '😢'
//             case 2:
//                 return '🙁'
//             case 3:
//                 return '😐'
//             case 4:
//                 return '🙂'
//             case 5:
//                 return '😀'
//             default:
//                return 'No smiley...'
//             break;
//         }
//     }
//   }

//   app.config.globalProperties.$filter = {
//     numbers(value) {
//         switch (value) {
//             case 1:
//                 return '1️⃣'
//             case 2:
//                 return '2️⃣'
//             case 3:
//                 return '3️⃣'
//             case 4:
//                 return '4️⃣'
//             case 5:
//                 return '5️⃣'
//             default:
//                return 'No smiley...'
//             break;
//         }
//     }
//   }

  app.use(pinia).use(router).mount('#app')