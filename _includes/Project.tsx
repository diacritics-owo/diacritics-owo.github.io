import { React } from 'lume/deps/react.ts';

export default (data: {
  slug: string;
  data: { title: string; description: string };
}) => (
  <>
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h3 className="mt-0">
        <a href={data.slug}>{data.data.title}</a>
      </h3>
      <p className="mb-0">{data.data.description}</p>
    </div>
  </>
);
