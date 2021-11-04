import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Index = () => {
  const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <h1 className="font-bold text-2xl">Index page title</h1>
      <p className="text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, commodi alias dolorem quis quod neque soluta vitae architecto impedit iusto blanditiis numquam magni quasi dolores, voluptates distinctio dignissimos veritatis veniam!</p>
    </Main>
  );
};

export default Index;
