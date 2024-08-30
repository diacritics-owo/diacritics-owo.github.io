import { React } from 'lume/deps/react.ts';
import Info from './Info.tsx';

export default (data: {
  slug: string;
  data: {
    title: string;
    date: Date;
    readingInfo: { words: number; minutes: number };
  };
}) => (
  <>
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h3 className="mt-0">
        <a href={data.slug}>{data.data.title}</a>
      </h3>
      <Info {...data.data} />
    </div>
  </>
);
