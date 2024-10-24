import '../../styles/Contact.css'
import logoGithub from '../../assets/github.svg'

function Contact() {
  return(
    <section id="contact" class="contact-header flex-c justify-between">
        <h1>Contact us</h1>
        
        <p>Our platform allows users to register, create, and manage their own sets of flashcards to practice vocabulary in a personalized way. Users can review their flashcards and improve their learning interactively. The website is part of the final project for a course, demonstrating skills in web application development using modern technologies</p>
        <div>
          <p>Do you have any questions or comments? We would love to hear from you!</p>
          <div className='flex-r justify-center g50'>
            <a href="https://github.com/David-Carballo">Github</a>
            <a href="https://www.linkedin.com/in/david-carballodev/">Linkedin</a>
          </div>
        </div>
    </section>
  );
}

export default Contact;