import { FiArrowUpRight } from "react-icons/fi";
import { displayDate, addDaysToDate } from "./tools";

export default function Timeline({ times, contactInterval, followup, addToFollowups }) {
  const lineStyling = "py-1 empty:leading-normal empty:h-[2rem]"; // Provde settings for empty lines to ensure they keep their height

  const existing = times;
  if (!existing) {
    return (
      <div className="flex flex-row">
        <svg className="fill-gray-3" width="24" height="32"><circle cx="12" cy="16" r="3"/></svg>
        <span className={lineStyling}>Nothing -&nbsp;</span>
        <span
          className={`${lineStyling} text-purple-4 cursor-pointer underline font-bold`}
          onClick={addToFollowups}
        >
          Add to Follow-ups
        </span>
      </div>
    );
  }

  // Should we add an entry for the next followup? Only do so if a contact interval is provided
  const useNextFollowup = Boolean(contactInterval);
  // Determine next followup
  const nextFollowup =
    useNextFollowup &&
    addDaysToDate(new Date(times[times.length - 1].time), contactInterval);

  return (
    <div className="flex flex-row">
      <svg className="fill-gray-3" width="24" height={32 * (times.length + useNextFollowup)}>
        {times.map((_, index) => (
          <circle
            key={index}
            cx="12"
            cy={32 * index + 16}
            r="3"
          />
        ))}
        {times.map(
          (_, index) =>
            index > 0 && ( // Draw n - 1 bars to connect n items
              <rect
                key={index}
                width="1"
                height="26"
                x="12"
                y={32 * index - 13}
              />
            )
        )}
        {
          // Include an extra line and dot for a user with a scheduled follow up
          useNextFollowup && (
            <>
              <circle
                cx="12"
                cy={32 * times.length + 16}
                r="3"
              />
              <rect
                width="1"
                height="26"
                x="12"
                y={32 * times.length - 13}
              />
            </>
          )
        }
      </svg>{" "}
      <div className="flex flex-col">
        {times.map(({ time, note }, index) => {
          return (
            <div className={`${lineStyling} mr-2`} key={index}>
              {displayDate(new Date(time))}
            </div>
          );
        })}
        {useNextFollowup && (
          <div className={`${lineStyling} font-bold mr-2 text-purple-4`}>
            {displayDate(nextFollowup)}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {times.map(({ time, note }, index) => {
          return (
            <div className={lineStyling} key={index}>
              {note}
            </div>
          );
        })}
        {useNextFollowup && (
          <div
            className={`${lineStyling} cursor-pointer underline font-bold text-purple-4`}
            onClick={followup}
          >
            Follow-up
            <FiArrowUpRight className="inline" size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
