export class Recipe{  
        //id:string;
        title:string;
        category:string;
        description:string;
        level:string;
        cooktime:string;
        persones:string;
        image:string;
        ingredients:Ingredients[];
        steps:Steps[];
        nutritiofacts:Nutritionfacts;
        constructor(){
            this.title='Neki kolac 3';
            this.category='dinner';
            this.level='easy';
            this.cooktime='10min';
            this.description='Lore ipsum';
            this.image='kolac3';
            this.persones='4';
            this.ingredients=[
                {
                    name:'brasno',
                    amount:'45g'
                },
                {
                    name:'secer',
                    amount:'450g'
                }
            ]
            this.nutritiofacts={
                calories:'23',
                proteins:'54',
                carbs:'65',
                fat:'89'
            }
            this.steps=[
                {
                    ordernumber:'1',
                    content:'Lorem ipsum'
                },
                {
                    ordernumber:'2',
                    content:'Lorem ipsum dolor'   
                }
            ]
        }        
}
export class Ingredients{
    name:string;
    amount:string;
}
export class Steps{
    ordernumber:string;
    content:string;
}
export class Nutritionfacts{
    calories:string;
    proteins:string;
    carbs:string;
    fat:string;
}
