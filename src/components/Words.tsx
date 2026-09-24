/**
 * Splits a line into word spans for `revealWords`. Splits on spaces only, so Arabic letters
 * inside a word stay joined.
 */
export default function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span data-word>{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
