import { React } from 'lume/deps/react.ts';

export default ({
  slug,
  data,
}: {
  slug: string;
  data: { title: string; description: string };
}) => (
  <>
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow mb-10">
      <h3 className="mt-0">
        <a href={slug}>{data.title}</a>
      </h3>
      <p className="mb-0">{data.description}</p>
    </div>
  </>
);
