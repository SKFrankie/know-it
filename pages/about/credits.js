import AboutContainer from "../../features/about/AboutContainer";
import { HowToPlay } from "../../features/modals/HowToPlayPopup";
import { Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { SectionTitle, SubTitle } from "../../ui/Title";

const AboutUs = () => {
  return (
    <AboutContainer>
      <SectionTitle id="how-to-play">HOW TO PLAY KNOW IT!</SectionTitle>
      <HowToPlay />
      <SubTitle>SIMPLIFIED RULES</SubTitle>
      <Text>
        Earn points in Grammar Geek, Synonym Roll, Antonym Hunt and Fab Vocab. After each round,
        your points will fill the Star Bar. Points are also converted into coins. Use coins to buy
        and collect Gigil Monsters in the SHOP. You can see your entire Gigil Monster collection in
        your Inventory and choose one for your avatar. Play games and Fill your Star Bar! When a
        Star Bar is filled, you win a Star. Stars allow you to compete in the KNOWLYMPICS.
      </Text>
      <SubTitle>POINTS, COINS, STARS, MEDALS AND BONUSES!</SubTitle>
      <Text>
        Grammar Geek, Synonym Roll, Antonym Hunt and Fab Vocab Point system:
        <br />
        1 correct answer = 2 Points and 2 Coin <br />
        Accumulate 100 Points to fill the Star Bar and win one Star. Bonus: In some games making
        zero mistakes can make you win bonus coins / points!
      </Text>
      <Text id="knowlympics" fontSize="lg">
        Knowlympics Point System:
      </Text>
      <Text>
        1 correct answer = 2 Medals and 2 Coin <br />
        Weekly Ranking is based on your accumulated Medals earned during the current week in the
        Knowlympics competition. See how many medals you earned and how you are ranked against other
        players in the Weekly Ranking.
        <br />
        Need more coins? Want more Stars? Visit the Shop for In-App purchases.
      </Text>
      <Text align="center">Either you Know It! or you don’t.</Text>

      <Text align="center">If you don’t then play until you’re a KNOW-IT-ALL</Text>

      <SectionTitle id="how-to-play">MORE ABOUT KNOW IT!</SectionTitle>
      <SubTitle id="grammarGeek">Q: How do I play GRAMMAR GEEK?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on Grammar Geek.</ListItem>
        <ListItem>Choose the answer that best completes the sentence.</ListItem>
        <ListItem>Correct answers appear in GREEN and wrong answers appear in RED.</ListItem>
        <ListItem>
          After you choose your answer, the timer will stop so that you can see the grammar tense or
          grammar point related to the correct answer.{" "}
        </ListItem>
        <ListItem>Click on CONTINUE for the next sentence. The timer will start again.</ListItem>
        <ListItem>When Time’s Up, you will see your reward. </ListItem>
        <ListItem>Click on Continue to play another round.</ListItem>
      </UnorderedList>
      <SubTitle id="synonymRoll">Q: How do I play SYNONYM ROLL?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on SYNONYM ROLL.</ListItem>
        <ListItem>
          Match words that are synonyms. A synonym is a word or phrase that has the same or nearly
          the same meaning as another word or phrase in the same language.
        </ListItem>
        <ListItem>Synonyms could be pairs of nouns, verbs, adverbs or adjectives.</ListItem>
        <ListItem>
          Answers are color coded. Correct answers appear in the same color. You will get an error
          message if the words do not match.
        </ListItem>
        <ListItem>
          After you complete a set, the timer will stop so that you can see all the color coded
          answers.
        </ListItem>
        <ListItem>Uncompleted sets = 0 points</ListItem>
        <ListItem>
          Click on CONTINUE for the next set. Points are earned for sets that are completed.
        </ListItem>
        <ListItem>When Time’s Up, you will see your reward. </ListItem>
        <ListItem>Click on Continue to play another game.</ListItem>
      </UnorderedList>
      <SubTitle id="antonymHunt">Q: How do I play ANTONYM HUNT?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on ANTONYM HUNT.</ListItem>
        <ListItem>
          Match words that are antonyms. An antonym is a word or phrase that has the opposite
          meaning as another word or phrase in the same language.
        </ListItem>
        <ListItem>Antonyms could be pairs of nouns, verbs, adverbs or adjectives.</ListItem>
        <ListItem>
          Answers are color coded. Correct answers appear in the same color. You will get an error
          message if the words do not match.
        </ListItem>
        <ListItem>
          After you complete a set, the timer will stop so that you can see all the color coded
          answers.
        </ListItem>
        <ListItem>Uncompleted sets = 0 points</ListItem>
        <ListItem>
          Click on CONTINUE for the next set. Points are earned for sets that are completed.
        </ListItem>
        <ListItem>When Time’s Up, you will see your reward. </ListItem>
        <ListItem>Click on Continue to play another game.</ListItem>
      </UnorderedList>
      <SubTitle id="fabVocab">Q: How do I play FAB VOCAB?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on FAB VOCAB </ListItem>
        <ListItem>
          Look at the picture. Choose 5 words that correspond to what you see in the picture.{" "}
        </ListItem>
        <ListItem>
          Answers are color coded. Correct answers appear in green. Incorrect answers appear in red.
          You can only choose 5 words. After choosing 5 words, you will see the answers.
        </ListItem>
        <ListItem>
          Then, choose the one of the three sentences that describes what you see in the picture.
          The correct answer appears in green. The incorrect answers appear in red.
        </ListItem>
        <ListItem>
          After you complete a set, the timer will stop so that you can see all the color coded
          answers.
        </ListItem>
        <ListItem>Uncompleted sets = 0 points</ListItem>
        <ListItem>
          Click on CONTINUE for the next set. Points are earned for sets that are completed.
        </ListItem>
        <ListItem>When Time’s Up, you will see your reward. </ListItem>
        <ListItem>Click on Continue to play another game.</ListItem>
      </UnorderedList>
      <SubTitle id="letsTalk">Q: How do I play LET’S TALK?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on Let’s Talk.</ListItem>
        <ListItem>Choose the best response to the statement or question.</ListItem>
        <ListItem>Correct answers appear in GREEN and wrong answers appear in RED.</ListItem>
        <ListItem>After you choose your answer, the timer will stop.</ListItem>
        <ListItem>Click on CONTINUE for the next sentence. The timer will start again</ListItem>
        <ListItem>
          When Time’s Up, you will see your reward. You must finish the game to receive your reward.
        </ListItem>
        <ListItem>Click on Continue to play another round.</ListItem>
      </UnorderedList>
      <SubTitle id="numbersPlus">Q: How do I play 3-2-1 GO?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on 3-2-1 Go!</ListItem>
        <ListItem>Choose the answer that corresponds to the number that is written.</ListItem>
        <ListItem>Correct answers appear in GREEN and wrong answers appear in RED.</ListItem>
        <ListItem>
          After you choose your answer, the timer will stop so that you can see the module that
          corresponds to the correct answer.
        </ListItem>
        <ListItem>
          You can access the modules if you subscribe to Grammar+ Guide and No Ads Bundle. Click on
          the Shop and go to In-App purchases
        </ListItem>
        <ListItem>Click on CONTINUE for the next sentence. The timer will start again.</ListItem>
        <ListItem>
          When Time’s Up, you will see your reward. Always finish the game to receive your reward.
        </ListItem>
        <ListItem>Click on Continue to play another round.</ListItem>
      </UnorderedList>
      <SubTitle>How do I use STARS and the STAR BAR?</SubTitle>
      <UnorderedList>
        <ListItem>When you earn 100 points in the games, you fill the Star Bar.</ListItem>
        <ListItem>When the STAR BAR is filled, you win one star.</ListItem>
        <ListItem>Stars allow you to compete in the Knowlympics.</ListItem>
        <ListItem>In order to be ranked, you have to earn medals in the Knowlympics.</ListItem>
      </UnorderedList>
      <SubTitle>How do I compete in the KNOWLYMPICS and get on the WEEKLY RANKING?</SubTitle>
      <UnorderedList>
        <ListItem>You can compete in the Knowlympics if you have at least one star.</ListItem>
        <ListItem>If the Knowlympics podium is grey, then you are out of stars.</ListItem>
        <ListItem>
          Click on the Knowlympics podium to see your ranking on the Weekly Rank chart.
        </ListItem>
        <ListItem>Click on compete to play in the Knowlympics.</ListItem>
        <ListItem>
          In the Knowlympics (which includes Grammar Geek, Synonym Roll, Antonym Hunt and Fab Vocab
          questions) you earn medals as well as coins.{" "}
        </ListItem>
        <ListItem>The competition is timed.</ListItem>
        <ListItem>
          At the end of the week, if you are ranked 1st, 2nd or 3rd place, you win an exclusive
          Gigil Monster for your collection.
        </ListItem>
      </UnorderedList>

      <SubTitle>How do I see my RANKING</SubTitle>
      <UnorderedList>
        <ListItem>
          If you have at least one star, from the Home Page, you can click on KNOWLYMPICS and you
          will find the weekly ranking.
        </ListItem>
        <ListItem>Weekly rankings are reset on Sunday at midnight (Paris time).</ListItem>
        <ListItem>
          You could also click on Profile (or the Profile icon) and you will see your current Gigil
          Monster avatar, your Current Ranking, the current number of Stars and Coins you have
          earned, your current Star Bar and the date on which you started playing Know It!
        </ListItem>
      </UnorderedList>

      <SubTitle>How do I collect my GIFT OF THE DAY?</SubTitle>
      <UnorderedList>
        <ListItem>
          From the Home Page, click on the Gift icon to receive your daily gift (more coins and
          Stars).
        </ListItem>
        <ListItem>DAY 1 starts on the 1st of each month.</ListItem>
        <ListItem>On the 26th til the end of the month, your gift is 5 coins per day.</ListItem>
        <ListItem>
          If you miss any days, you can pay a one time purchase to receive unclaimed gifts and
          receive double the amount of each gift you have already collected that month.{" "}
        </ListItem>
      </UnorderedList>

      <SubTitle>How can I buy Gigil Monsters?</SubTitle>
      <UnorderedList>
        <ListItem>From the Home Page, click on the SHOP.</ListItem>
        <ListItem>
          You will see the Gigil Collections. There are up to 10 Gigils in one collection.
        </ListItem>
        <ListItem>
          Click on a Gigil Monster to see the name of the Gigil Monster and the purchase offer. You
          can enlarge the pictures to get a closer look at the details, and then purchase using the
          coins you have earned, or cancel.
        </ListItem>
        <ListItem>
          Not enough coins to buy more Gigil Monsters? Purchase more coins in the Shop.
        </ListItem>
      </UnorderedList>

      <SubTitle>Where can I see My Gigil Monster Collection and change my avatar?</SubTitle>
      <UnorderedList>
        <ListItem>
          Click on Gigil Collection (or the pink Gigil Monster icon) to see your Gigil Monster
          Collection. At the top of the page you will see the number of Gigil Monsters you have
          purchased.
        </ListItem>
        <ListItem>
          Click on any Gigil Monster to enlarge the picture or to select as your avatar.
        </ListItem>
      </UnorderedList>
      <Text>Need more coins? Want more Stars? Visit the Shop for In-App purchases.</Text>
    </AboutContainer>
  );
};

export default AboutUs;
