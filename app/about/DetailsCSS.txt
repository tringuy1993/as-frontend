

small {
    color: white
}

.imgsize {
  width:100%;
}


/* Intro */
#intro {
  padding-bottom: 4rem 1rem 10rem 1rem;
  align-items: center;

}

#intro a {
  text-decoration: none;
}
#intro p{
  font-size:1rem;
  line-height:1.5;
  text-align: justify;
}
#intro .name {
  font-family: var(--mono);
  font-size: 1rem;
}

#intro ol{
  text-align: left;
}

#intro h1{
  text-align: left;
}

.name span {
  font-family: var(--sans);
  font-size: 4rem;
  color: var(--aqua);
  font-weight: 300;
}

#intro h2 {
  font-size: 4rem;
  font-weight:normal;
}


.blackbox {
  background-color: var(--black);
  padding: 1rem;
  border-radius: 10px;
  color: var(--white);
  font-size: 1rem;
  line-height: 1.5;
  /* text-align: left; */
  text-align: justify
}

#projects {
  text-align: left;
  padding: 4rem 1rem 2rem 1rem;
  /* max-width: var(--maxwidth); */
  margin:0 auto;
  text-align: left;
  color: white;

}

#projects .reverse {
  text-align: right;
}

#projects .reverse ul {
  justify-content: flex-end;
}

#projects h2 {
  font-size: 2.5rem;
  margin-bottom: calc(2.5rem * 1.5);
}
#projects h3 {
  color: var(--aqua)
}

#project h4 {
  font-size: 1rem;
  font-family: var(--mono);
  margin: 0;
}

#projects ul {
  list-style-type: none;
  padding:0;
  margin:0;
  display:flex;
  flex-flow: row wrap;
  justify-content:flex-start;
  gap:1rem;
  font-size:1rem;

}

/* Section */
.section-dkblue{
  background-color: var(--dkblue);
}

/* Gradient Line */
.gradient {
  height:2px;
  background: linear-gradient(98deg, rgba(2,0,36,1) 0%, rgba(12,9,121,1) 0%, rgba(0,212,255,1) 100%);
}

.modal label{
  color:white;
}


.modal-content {
  background-color: var(--dkblue);
}

.modal-header .btn-close {
  opacity:0.5;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat
}

button.echart {width: 100%; height:50vh; background-color: var(--dkblue);}

.calendarElement {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40px;
  border: 1px solid #ccc;
  z-index: 999;
}





