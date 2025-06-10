
import { Badge } from "../Badge"
import MissionImage from "./MIssionImage"




export default function Mission() {
  return (
    <section
      aria-labelledby="code-example-title"
      className="mx-auto mt-28 w-full max-w-6xl px-3"
    >
      <Badge>Our Mission</Badge>
      <h2
        id="our-mission-title"
        className="mt-2 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-6xl dark:from-gray-50 dark:to-gray-300"
      >
        Empowering Spiritual <br /> Growth Through Technology
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        Rich and expressive query language that allows you to filter and sort by
        any field, no matter how nested it may be.

        
        Our app’s mission is to make faith-based content accessible to all. 
        Sermons inspire and unite people in their spiritual journeys. 
        By merging technology with timeless messages,
        we create a platform that fosters connections and encourages growth.
      </p>
     
     <div className="gap-10 items-start mt-10">

     <MissionImage/>
     </div>
     

    </section>
  )
}
