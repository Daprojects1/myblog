import HomePage from "../components/HomePage"


const data = [
  {
    title: `The new order of things in the new system. Jesus' reign has begun!`,
    preview: 'There is a new way of life here as the thousand year reign begins! The days are going by quickly ...' ,
    date: '02 Dec 20',
    readTime: '5 mins read',
    id:1
  },
  {
    title: `The new order of things in the new system. Jesus' reign has begun!`,
    preview: 'There is a new way of life here as the thousand year reign begins! The days are going by quickly ...' ,
    date: '02 Dec 20',
    readTime: '5 mins read',
    id:2
  },
  // {
  //   title: `The new order of things in the new system. Jesus' reign has begun!`,
  //   preview: 'There is a new way of life here as the thousand year reign begins! The days are going by quickly ...' ,
  //   date: '02 Dec 20',
  //   readTime:'5 mins read'
  // },
  // {
  //   title: `The new order of things in the new system. Jesus' reign has begun!`,
  //   preview: 'There is a new way of life here as the thousand year reign begins! The days are going by quickly ...' ,
  //   date: '02 Dec 20',
  //   readTime:'5 mins read'
  // }
]
export default function Home() {
  return (
    <HomePage data={data} />
  )
}
