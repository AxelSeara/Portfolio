import Avatar from './Avatar/avatar.png';

const AboutContent = () => (
    <>
      <div className="flex flex-col items-center p-4 max-w-xl">
        <img
          src={Avatar}
          alt="Axel"
          className="w-48 h-48  mb-4"
        />
        <h1 className="text-3xl font-bold text-accent mb-2">Hey! Here Axel</h1>
        <h2 className="text-xl  text-accent mb-4"> Welcome to my portoflio </h2>
        <p className="text-accent ">
          I'm a graphic designer turned web developer. Welcome to my lovely web page where I showcase my skills, projects, and passion for design and development. Explore and enjoy your visit!
        </p>
      </div>
    </>
  );
  
  export default AboutContent;