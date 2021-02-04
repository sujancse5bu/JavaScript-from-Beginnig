const companies = [
    {name: 'Company One', category: 'Finance', start: 1981, end: 2003},
    {name: 'Company Two', category: 'Retail', start: 1992, end: 2008},
    {name: 'Company Three', category: 'Auto', start: 1999, end: 2007},
    {name: 'Company Four', category: 'Technology', start: 1989, end: 2010},
    {name: 'Company Five', category: 'Finance', start: 2009, end: 2014},
    {name: 'Company Six', category: 'Auto', start: 1987, end: 2010},
    {name: 'Company Seven', category: 'Technology', start: 1986, end: 1996},
    {name: 'Company Eight', category: 'Retail', start: 2011, end: 2016},
    {name: 'Company Nine', category: 'Auto', start: 1981, end: 1989}
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];


























/*

//filter
//
// Get 21 or older -_-
let canDrink = [];
for (let i = 0; i < ages.length; ++i) {
    if (ages[i] >= 21) {
        canDrink.push(ages[i]);
    }
}

const canDrink = ages.filter( age => age >= 21);

console.log(canDrink);

 const retailCompanies = companies.filter( company => company.category === 'Retail');
console.log(retailCompanies);

*/

// Map 
// Create Array of company names 
//const companyNames = companies.map(company =>  company.name + ' [' + company.start + ' - '  + company.end + ']');
//console.log(companyNames);


// Sort 
//const sortedCompanies = companies.sort((a,b) => (a.start > b.start ? 1 : -1));
//console.log(sortedCompanies);



// reduce 

//const ageSum = ages.reduce((total, age) => total + age, 0);
//console.log(ageSum);

// get total years 
//const totalYears = companies.reduce((total, company) => total + (company.end - company.start), 0);
//console.log(totalYears);






// Combined Method
const combined = ages
    .map(age => age * 2)
    .filter(age => age >= 40)
    .sort((a,b) => a - b)
    .reduce((a,b) => a+b, 0);
console.log(combined);