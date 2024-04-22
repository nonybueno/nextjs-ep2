"use client"
import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'

function Pokedata() {
    const [ poke , setPoke ] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("poke",poke);

    useEffect(()=>{
        setLoading(true)
        const fetchPokeData = async () => {
            try{
                const res = await fetch("https://pokeapi.co/api/v2/pokemon");
                const pokeData = await res.json()
                // console.log(pokeData);
                setPoke(pokeData.results)
            }catch(err){
                console.log(err);
            }
            setLoading(false)
        }
        fetchPokeData()
    }, [])
  return (
    <div className='container text-center mx-auto'>
        {loading ? (
            <p>Loading...</p>
        ):(
            <div className='grid grid-cols-5'>
                {poke.map((val,index)=>(
                    <Link key={val.name} href={`/pokeInfo/[id]`} as={`/pokeInfo/${index+1}`}>
                        <div key={index} className='flex justify-center items-center shadow-md transition cursor-pointer hover:shadow-lg m-3 rounded-md'>
                            <div>
                                <h3>{val.name}</h3>
                                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                                    width={150} height={150} alt={val.name}/>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default Pokedata