const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const studentNodes = xmlDOM.querySelectorAll("student");

let result = {
  list : []
}

studentNodes.forEach(elem => {
  let firstNameNode = elem.querySelector("first");
  firstName = firstNameNode === null ? "" : firstNameNode.textContent;
  
  let secondNameNode = elem.querySelector("second");
  secondName = secondNameNode === null ? "" : secondNameNode.textContent;
  
  let ageNode = elem.querySelector("age");
  age = ageNode === null ? "" : Number(ageNode.textContent);
  
  let profNode = elem.querySelector("prof");
  prof = profNode === null ? "" : profNode.textContent;
  
  let nameNode = elem.querySelector("name");
  if (nameNode === null) {
    lang = ""
  } else {
    let langAttr = nameNode.getAttribute('lang');
    lang = langAttr === null ? "" : langAttr;
  } 

  result.list.push({
    name: [firstName, secondName].join(" "),
    age: age, 
    prof: prof,
    lang: lang
  });
});