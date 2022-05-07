import Link from 'next/link';
import { supabase } from '../utils/client';
import { useEffect } from 'react';

export default function Test() {
    const getSolution = async () => {
        let { data: Solutions, error } = await supabase
        .from('Solutions')
        .select('*')
        .eq('id', 1)
        console.log(Solutions)
    }

    useEffect(() => {
        getSolution()
    }, [])
    
    return (
        <div>
            <li>
                <Link href="/">
                    Home Page
                </Link>
            </li>
            <button onClick={() => getSolution()}>Get Solution</button>
        </div>
    )
}