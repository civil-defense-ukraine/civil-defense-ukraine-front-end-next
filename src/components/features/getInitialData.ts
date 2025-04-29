import { publicNews } from "../services/public/publicNews";
import { team } from "../services/public/team";
import { sort } from "../utils/sortItems";

export async function getInitialNews() {
  const news = await publicNews.get();
  return news.sort(sort.newsByDate);
}

export async function getInitialTeam() {
  const res = await team.get();
  return res.sort(sort.teamMembers);;
}