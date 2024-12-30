import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8">
        <Title text1={"about"} text2={"us"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10">
        <div>
          <img
            src={assets.about_img}
            alt="image"
            className="w-full md:max-w-[480px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-textColor2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            sunt nemo consequatur illum natus deserunt minima esse alias
            voluptas iusto neque, quidem ea veritatis, nam officiis, nobis
            temporibus beatae repudiandae deleniti earum eligendi eaque velit
            totam.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            repudiandae aliquid error officia nihil animi perferendis corporis
            non perspiciatis temporibus optio obcaecati explicabo vero illum
            totam quidem quae voluptate, enim quam ipsa asperiores id quia.
            Accusantium, quas?
          </p>

          <b className="text-textColor1 font-medium text-xl">Our Mission</b>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo
            suscipit vero tempore qui, impedit recusandae ab. Rem similique
            laudantium dolorem sequi iste placeat minima beatae maiores maxime.
            Quis vel ad voluptatem, aperiam illum quod tempora reprehenderit
            velit ab nostrum, maiores possimus quidem.
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"we are the best"} />
      </div>

      {/* Card */}
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="font-medium">Quality Assurance:</b>
          <p className="text-textColor2">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="font-medium">Convenience:</b>
          <p className="text-textColor2">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="font-medium">Exceptional Customer Service:</b>
          <p className="text-textColor2">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* News-Letter-Box */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
