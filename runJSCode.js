// //declare varible (var,let,const)
// var a=9;
// var b=6;
// var ans=a+b;
// console.log(ans);
// console.log(typeof(ans));

// //arrays
// const cars=["Vitara","BMW","Kia",9,0];
// console.log(cars);
// cars.push("Mercedes");
// console.log(cars);
// console.log(cars[4]);


// //if-else
// var hour=16;
// if(hour<12){
//     console.log("not allowed");
// }
// else{
//     console.log("allowed");
// }

// //loops
// for(var i=0;i<10;i++){
//     console.log(i+1);
// }

//  const person= {
//     name:"Sneha",   //key:value
//     age:21,
//     surname:"Agrawal",
//     food:["Noodles","Burger","Pizza"]
//  };
//  console.log(person.food);

//filter function
// let age=[16,20,67,87,12,90];
// let result=age.filter(checkAge);
// function checkAge(age){
//     return age%4==0;
// }
// console.log(result);


//Prompt
var prompt=require('prompt-sync')();
let age=prompt("Please Enter your age: ");
if(age>18){
    console.log("You are adult");
}
else{
    console.log("You are not an adult");
}
