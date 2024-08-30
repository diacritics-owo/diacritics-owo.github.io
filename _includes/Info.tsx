import { React } from 'lume/deps/react.ts';

export default ({
  margin = false,
  date,
  readingInfo,
}: {
  margin?: boolean;
  date: Date;
  readingInfo: { words: number; minutes: number };
}) => (
  <>
    <p className={`text-sm${margin ? '' : ' mb-0'}`}>
      {date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })}
      <br />
      {readingInfo.words} word
      {readingInfo.words === 1 ? '' : 's'} / {readingInfo.minutes} minute
      {readingInfo.minutes === 1 ? '' : 's'}
    </p>
  </>
);
