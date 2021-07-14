import { useRouter } from 'next/router';
export default function ContactId() {

    const router = useRouter();
    const { id } = router.query; // destructurization object Query in useRouter

    return (
        <div> 
            <p> At ID number: {id} </p>
        </div>
    );
}