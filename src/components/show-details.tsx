/* eslint-disable @typescript-eslint/no-unused-vars */
import { Play, X, Clock } from "lucide-react";
import styles from "./show-details.module.scss";
import { useState, useEffect } from "react";
import { Episode, Show, WatchProgress } from "../libs/types";
import CardGeneral from "./CardGeneral";
import AboutCast from "./AboutCast";
import Header from "./Header";

export default function ShowDetails() {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [activeSeason, setActiveSeason] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [watchProgress, _setWatchProgress] = useState<WatchProgress>({
    "EPI-01": 30,
    "EPI-02": 75,
    "EPI-03": 100,
    "EPI-04": 10,
    "EPI-05": 24,
    "EPI-06": 41,
    "EPI-07": 18,
    "EPI-08": 2,
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [showResponse, episodesResponse] = await Promise.all([
          fetch(
            "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json"
          ),
          fetch(
            "https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json"
          ),
        ]);

        if (!showResponse.ok || !episodesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const showData = await showResponse.json();
        const episodesData = await episodesResponse.json();

        setShow(showData);
        setEpisodes(episodesData.filter(Boolean));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const seasons = [
    ...new Set(episodes.map((episode) => episode.SeasonNumber)),
  ].sort();
  const filteredEpisodes = episodes.filter(
    (episode) => episode.SeasonNumber === activeSeason
  );

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${show?.Images.Background})` }}
      >
        <button className={styles.closeButton}>
          <X className={styles.closeIcon} />
        </button>
        <Header show={show}/>
        <div className={styles.episodesPanel}>
          <div className={styles.seasonTabs}>
            {seasons.map((season) => (
              <button
                key={season}
                className={`${styles.seasonTab} ${
                  activeSeason === season ? styles.active : ""
                }`}
                onClick={() => setActiveSeason(season)}
              >
                T{season}
              </button>
            ))}
          </div>

          <div className={styles.episodeList}>
            {filteredEpisodes.map((episode) => (
              <div
                key={episode.ID}
                className={`${styles.episodeItem} ${
                  selectedEpisode?.ID === episode.ID ? styles.selected : ""
                }`}
                onClick={() =>
                  setSelectedEpisode(
                    selectedEpisode?.ID === episode.ID ? null : episode
                  )
                }
              >
                <div className={styles.episodeHeader}>
                  <span className={styles.episodeNumber}>
                    {episode.EpisodeNumber}
                  </span>
                  <span className={styles.episodeTitle}>{episode.Title}</span>
                  <button className={styles.playButton}>
                    <Play className={styles.playIcon} />
                  </button>
                </div>

                {selectedEpisode?.ID === episode.ID && (
                  <div className={styles.episodeDetails}>
                    <div className={styles.episodeImageWrapper}>
                      <img
                        src={episode.Image}
                        alt={episode.Title}
                        width={280}
                        height={157}
                        className={styles.episodeImage}
                      />
                      <div className={styles.progressBarContainer}>
                        <div
                          className={styles.progressBar}
                          style={{
                            width: `${watchProgress[episode.ID] || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.episodeDuration}>
                      <Clock className={styles.clockIcon} />
                      {episode.Duration} min
                    </div>
                    <p className={styles.episodeSynopsis}>{episode.Synopsis}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.navContainer}>
          <nav className={styles.navigation}>
            <button
              className={`${styles.navButton} ${
                activeTab === "GENERAL" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("GENERAL")}
            >
              GENERAL
            </button>
            <button
              className={`${styles.navButton} ${
                activeTab === "ELENCO" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("ELENCO")}
            >
              ELENCO
            </button>
            <button
              className={`${styles.navButton} ${
                activeTab === "PRINCIPALES PREMIOS" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("PRINCIPALES PREMIOS")}
            >
              PRINCIPALES PREMIOS
            </button>
          </nav>
        </div>
        <div className={styles.tabContent}>
          {activeTab === "GENERAL" && <CardGeneral synopsis={show?.Synopsis} />}
          {activeTab === "ELENCO" && <AboutCast show={show} />}
        </div>
      </footer>
    </div>
  );
}
