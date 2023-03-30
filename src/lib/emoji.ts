export { default as emojiJSON } from "~/assets/json/emoji_v14.0.json";

export const showEmoji = (emoji: string[]) =>
  emoji.reduce(
    (prev, current) => prev + String.fromCodePoint(parseInt(current, 16)),
    ""
  );