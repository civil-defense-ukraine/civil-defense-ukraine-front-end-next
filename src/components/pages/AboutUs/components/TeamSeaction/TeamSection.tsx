"use client";

import { useMemo, useState } from "react";
import styles from "./TeamSection.module.scss";
import { useWidth } from "../../../../hooks/useWidth";
import classNames from "classnames";
import { useAppSelector } from "../../../../app/hooks";
import { Loader } from "../../../../components/Loader";
import { TeamCard } from "./components/TeamCard";
import { screenWidth } from "../../../../constants/screenWidth";
import { ErrorComponent } from "@/components/components/ErrorComponent";

export const TeamSection = () => {
  const [showAllTeam, setShowAllTeam] = useState(false);
  const { team, loading, error } = useAppSelector((state) => state.team);

  const width = useWidth();

  const itemsPerPage = useMemo(() => {
    if (width >= screenWidth.desktop) {
      return 3;
    } else {
      return 2;
    }
  }, [width]);

  const visibleTeam = useMemo(
    () => team.slice(0, itemsPerPage),
    [team, itemsPerPage]
  );
  const restOfTeam = useMemo(
    () => team.slice(itemsPerPage),
    [team, itemsPerPage]
  );
  const getMaxHeight = useMemo(() => {
    if (!showAllTeam) {
      return 0;
    }

    if (width >= screenWidth.desktop) {
      return Math.ceil(restOfTeam.length * itemsPerPage) * (363 + 24);
    }

    if (width >= screenWidth.tablet) {
      return Math.ceil(restOfTeam.length * itemsPerPage) * (454 + 32);
    }
    return restOfTeam.length * (454 + 32);
  }, [showAllTeam, width, restOfTeam, itemsPerPage]);

  return (
    <section className={styles.container}>
      <h2 className={`${styles.header} heading--h2`}>Our Team</h2>
      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {error.length > 0 && <ErrorComponent errorText={error} />}

      {error.length === 0 && !loading && (
        <>
          <div className={styles.team}>
            {visibleTeam.map((person) => (
              <TeamCard
                person={person}
                key={person.id}
              />
            ))}
          </div>
          <div
            className={classNames(`${styles.team__rest} ${styles.team}`, {
              [styles.team__rest__open]: showAllTeam,
            })}
            style={{
              maxHeight: `${getMaxHeight}px`,
            }}
          >
            {restOfTeam.map((person) => (
              <TeamCard
                person={person}
                key={person.id}
              />
            ))}
          </div>
          <button
            className={`${styles.teamSection__button} button button--secondary button--transparent`}
            disabled={team.length <= visibleTeam.length || error.length !== 0}
            onClick={() => {
              setShowAllTeam((prevState) => !prevState);
            }}
          >
            {`${showAllTeam ? "SEE LESS" : "SEE ALL"} `}
            {!showAllTeam && (
              <div className="icon icon--button icon--arrow icon--arrow--left"></div>
            )}
          </button>
        </>
      )}
    </section>
  );
};
