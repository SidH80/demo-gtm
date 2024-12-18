import React from 'react';
import RedlineMessage from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Redline Message Tests', () => {
    const message =
        '<h2><a>This is a link<span class="sr-only">This is sr-only text</span></a></h2><a>This is a link<span class="sr-only">This is sr-only text</span></a>';

    // const mockImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTEuNjI2IiBoZWlnaHQ9IjUxMS42MjciIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjciPjxnIGZpbGw9IiMyMjdkYWUiPjxwYXRoIGQ9Ik0zOTIuODU3IDI5Mi4zNTRoLTE4LjI3NGMtMi42NyAwLTQuODYuODU1LTYuNTYzIDIuNTczLTEuNzE4IDEuNzA4LTIuNTczIDMuODk3LTIuNTczIDYuNTYzdjkxLjM2YzAgMTIuNTY0LTQuNDcgMjMuMzE2LTEzLjQxNSAzMi4yNjMtOC45NDUgOC45NDUtMTkuNyAxMy40MTQtMzIuMjY0IDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiAwLTIzLjMxNy00LjQ3LTMyLjI2NC0xMy40MTQtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2MiA0LjQ3LTIzLjMxMyAxMy40MTctMzIuMjYgOC45NDctOC45NDYgMTkuNzAyLTEzLjQxNyAzMi4yNjQtMTMuNDE3aDIwMC45OTRjMi42NyAwIDQuODYtLjg2IDYuNTctMi41NyAxLjcxLTEuNzEzIDIuNTY2LTMuOSAyLjU2Ni02LjU2N1Y4Mi4yMmMwLTIuNjYtLjg1NS00Ljg1Mi0yLjU2Ni02LjU2Mi0xLjcxLTEuNzEzLTMuOS0yLjU2OC02LjU3LTIuNTY4SDgyLjIyNGMtMjIuNjQ4IDAtNDIuMDE2IDguMDQyLTU4LjEwMiAyNC4xMjVDOC4wNDIgMTEzLjI5NyAwIDEzMi42NjUgMCAxNTUuMzEzdjIzNy41NDJjMCAyMi42NDcgOC4wNDIgNDIuMDE4IDI0LjEyMyA1OC4wOTUgMTYuMDg2IDE2LjA4NCAzNS40NTQgMjQuMTMgNTguMTAyIDI0LjEzaDIzNy41NDNjMjIuNjQ3IDAgNDIuMDE3LTguMDQ2IDU4LjEtMjQuMTMgMTYuMDg2LTE2LjA3NyAyNC4xMjgtMzUuNDQ3IDI0LjEyOC01OC4wOTV2LTkxLjM1OGMwLTIuNjctLjg1Ni00Ljg2LTIuNTc0LTYuNTctMS43MTMtMS43MTgtMy45MDMtMi41NzMtNi41NjUtMi41NzN6Ii8+PHBhdGggZD0iTTUwNi4yIDQxLjk3Yy0zLjYxOC0zLjYxNi03LjkwNi01LjQyMy0xMi44NS01LjQyM0gzNDcuMTdjLTQuOTQ3IDAtOS4yMzIgMS44MDctMTIuODQ2IDUuNDI0LTMuNjE3IDMuNjE2LTUuNDI4IDcuOS01LjQyOCAxMi44NDhzMS44MSA5LjIzMyA1LjQyOCAxMi44NWw1MC4yNDcgNTAuMjQ4LTE4Ni4xNDYgMTg2LjE1Yy0xLjkwNiAxLjkwNC0yLjg1NiA0LjA5NC0yLjg1NiA2LjU2NCAwIDIuNDguOTUzIDQuNjY4IDIuODU2IDYuNTdsMzIuNTQ4IDMyLjU0NWMxLjkwMyAxLjkwMyA0LjA5MyAyLjg1MiA2LjU2NyAyLjg1MnM0LjY2NC0uOTQ4IDYuNTY2LTIuODUybDE4Ni4xNDgtMTg2LjE0OCA1MC4yNSA1MC4yNDhjMy42MTUgMy42MTcgNy45IDUuNDI2IDEyLjg0OCA1LjQyNnM5LjIzMy0xLjgwOCAxMi44NS01LjQyNWMzLjYxOC0zLjYxNiA1LjQyNS03Ljg5OCA1LjQyNS0xMi44NDdWNTQuODE4YzAtNC45NTItMS44MTQtOS4yMzItNS40MjgtMTIuODQ3eiIvPjwvZz48L3N2Zz4=';

    // const expandContentMessage = '\u003Cspan class=\u0022expand-content__collapsed\u0022\u003EIn married filing jointly situations, if you or your spouse unenrolled, submitted different bank account or address information for your advance payments, the taxpayer listed as the spouse on the 2019 or 2020 tax return will get their portion of the payments separately.\u003C\/span\u003E If your filing status on your 2020 tax return was Married Filing Jointly and you intend to file with the same spouse on your 2021 tax return, only one taxpayer needs to update the estimated 2021 combined modified adjusted gross income (AGI) at this time. Your spouse does not need to submit an update.'

    const tooBigResponse =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, porro in. Reprehenderit eos itaque veritatis quaerat. Labore obcaecati fuga porro temporibus molestiae ratione? Sunt maiores saepe animi, sapiente nesciunt magni similique in officia nulla esse fugit molestias molestiae incidunt nam. Ad quod omnis dolore beatae ipsum quae soluta libero ipsam. Tempore officiis, mollitia at cupiditate fugiat quas exercitationem. Eius ea distinctio ab corrupti, totam rem nostrum et, consequuntur rerum error similique? Odit, harum, dicta est, consequatur autem nisi repellendus deserunt vero magni accusantium eius facere fugiat architecto. Ea eum molestias accusamus, eius ducimus quod facilis enim saepe quam architecto ut nostrum iusto, eligendi ad recusandae officia optio assumenda consectetur, itaque aut adipisci labore? Delectus cumque cum labore alias esse, sed laboriosam aliquam aperiam blanditiis sapiente omnis, nisi excepturi eos tempora voluptatibus! Temporibus minima quam aperiam placeat quisquam. Minus aperiam excepturi quis, ut officia explicabo vero magni asperiores beatae error minima numquam facilis in. Perferendis in ex nesciunt eum ipsam voluptate placeat soluta necessitatibus! Ipsum reiciendis magni possimus inventore quidem rerum vero autem voluptates eos eveniet quae voluptas nihil repudiandae dolor doloremque dolores commodi placeat perspiciatis, recusandae deleniti nostrum cumque? Fuga beatae distinctio quas quia voluptatibus et ex recusandae dignissimos quos voluptas nobis eligendi quo, voluptate, dolores suscipit. Labore molestiae neque obcaecati accusamus sit deleniti molestias iusto maiores veniam similique optio, dolor totam nesciunt inventore aliquam architecto facilis impedit, eveniet cum ipsam repudiandae dicta officia odio praesentium. Quis officiis earum ab assumenda doloremque, iure nihil nemo amet consequuntur vel explicabo suscipit consectetur facere itaque saepe accusamus? Vitae autem itaque ratione dolorem soluta, aliquam voluptatem, tenetur odio dolore expedita in eius porro cumque! Ipsam delectus id odio, amet blanditiis sint error dolorum, voluptate obcaecati quaerat laborum libero fuga enim quo eos sed, nulla nisi vero animi iure? Commodi voluptas accusamus quam? Illum esse tenetur, magnam sequi aperiam exercitationem? Provident corrupti totam laudantium assumenda autem modi perferendis tempora nihil at, porro iure quam ipsa qui illo facere molestiae odit quae labore quas rem adipisci earum. Repellat, eos unde labore repellendus ex doloremque. In vitae, culpa suscipit repellat dolore, totam vel similique cumque molestias sed cum perspiciatis iste veniam? Adipisci facilis dolorum impedit amet cum? Ex vel sed excepturi, magnam consectetur obcaecati perspiciatis eligendi dolorem sunt, voluptatum libero ea, non aperiam quia dolor similique eaque! Officiis praesentium libero amet placeat rem facere eum dolorum, quibusdam asperiores perferendis, beatae, velit ipsam nemo assumenda itaque. Sunt blanditiis minus nemo quis veritatis ad! In dolor debitis voluptatibus inventore, hic placeat omnis explicabo vitae qui nihil possimus minima atque reprehenderit fugiat asperiores quas reiciendis id facere quaerat magnam ipsam libero ullam quasi. Cupiditate fugiat sunt iusto quae fuga illo unde! Ipsum, esse mollitia repudiandae ratione quod qui. At autem aut fuga! Laborum, aliquam. Magni asperiores enim totam sapiente saepe commodi possimus, doloribus, ratione ab est neque in, nobis consequuntur deserunt earum quidem. Quisquam dolore quasi, dolor at maxime reiciendis dignissimos? Nostrum ipsam, nihil sunt ex possimus delectus quam eos recusandae quasi aliquam ullam, tempore, suscipit ea libero qui in dicta beatae hic cum quisquam cupiditate incidunt molestias temporibus nam. Ea asperiores, cum impedit neque aliquam odit ipsum, ad cumque quasi unde illum quis maxime cupiditate ipsa dolores eum mollitia numquam eius repellat? Nihil facere beatae ducimus veniam. Repellat et iusto mollitia beatae tempore voluptatem unde vitae non earum maiores expedita delectus sunt, ad aspernatur sapiente repellendus. Ullam fuga earum inventore, nisi voluptas tempora. Sapiente repellendus qui commodi alias nisi est. Inventore labore laudantium nulla, a vero, aliquam optio consequuntur aperiam culpa ea aliquid soluta explicabo error laborum enim blanditiis autem beatae qui delectus iste in recusandae nobis asperiores. Quibusdam, molestiae atque incidunt sequi magni voluptatum culpa omnis molestias eaque cum nobis similique velit saepe odit, voluptas suscipit sit vero. Facilis debitis quos est ab magnam consequatur impedit asperiores, repellat soluta unde maiores nisi iusto quo tenetur non blanditiis? Libero aspernatur aut recusandae. Quisquam, ipsum corrupti fugiat placeat adipisci delectus et a assumenda rerum quam repellendus nam. Possimus sunt facilis assumenda minus tempora maxime veniam repudiandae aliquid est non maiores quae culpa eius animi et, soluta quasi molestiae saepe officiis. Doloribus, exercitationem iste. Magni, accusantium minima soluta voluptas aut aliquid rerum ipsum debitis deserunt nesciunt possimus impedit laboriosam blanditiis voluptatem deleniti illo autem sapiente earum officiis repellendus odio molestiae! Cupiditate cumque deleniti quis distinctio, alias itaque, perferendis tempora blanditiis harum unde suscipit ipsum eveniet, error aut odit fugit possimus architecto consequuntur ea atque! Dignissimos minus corrupti impedit excepturi quo, distinctio odio suscipit architecto sint fugiat omnis dolorem ullam in aspernatur accusamus corporis veniam, deleniti laudantium ducimus quia. Sed sint nesciunt qui, corrupti vero dicta dolores, ipsum, minus architecto rem itaque magni autem dignissimos? Hic, et. Dolore optio, facere doloribus at nemo illo ducimus dignissimos accusamus hic, modi voluptatum vel, officia dolorum rem? Iusto laboriosam magni libero vel sit quibusdam reprehenderit quas? Error magni tempora provident, sapiente assumenda laborum, modi voluptatibus, iure et dicta aliquid quae! Accusantium quasi officia consequuntur tenetur ea provident esse distinctio amet, aut eaque corrupti? Voluptatum maiores quibusdam quia nemo, fuga odio qui assumenda aliquam delectus expedita, dignissimos, soluta porro eveniet laborum rem nisi illum doloremque voluptates ut? Enim earum voluptates sequi facere harum ipsa veritatis qui neque corporis molestias, illo illum! Nostrum doloremque perferendis commodi veniam voluptas labore nihil nesciunt, ab ex facere voluptates architecto provident ratione necessitatibus vitae iusto. Provident ab non nesciunt suscipit, cum asperiores culpa aut laborum accusamus? Tempora eligendi dolorum nobis assumenda quibusdam laudantium repudiandae cumque debitis, illum culpa numquam sapiente. Nobis pariatur modi autem, dolorem cum doloribus laboriosam totam facilis ipsam nulla maiores natus, ad perferendis quod a saepe necessitatibus quasi dignissimos veritatis dolores ratione quas sit. Debitis ipsum sunt exercitationem in aperiam mollitia dignissimos voluptatibus dolor ducimus. Provident temporibus minus cupiditate aperiam amet. Est consequatur, voluptates beatae necessitatibus quas deleniti ea dolorum ratione mollitia. Suscipit dolor officia deserunt fugiat! Dignissimos deserunt cumque quia id? Ipsum facere, natus quo quae corporis vitae dolorum non a fugiat temporibus suscipit, eos libero magnam reprehenderit nisi rerum eveniet earum inventore! Hic corporis, iure consectetur impedit suscipit minima deserunt facilis dignissimos asperiores tenetur enim aperiam. Fugit nam reiciendis quibusdam veritatis nostrum voluptates eveniet cumque dolorem quae soluta debitis facere iste, vitae ut esse tenetur obcaecati, vero aperiam eum, consequuntur voluptatum laboriosam labore! At explicabo ea molestiae eius id esse, illum commodi repellendus quam! Officiis.';

    it('should render without crashing without props', () => {
        render(<RedlineMessage />);
    });

    it('should not render if data is over 1000 characters', () => {
        render(<RedlineMessage message={tooBigResponse} />);
        const RedlineElement = screen.queryByRole('heading');
        expect(RedlineElement).not.toBeInTheDocument();
    });

    it('should not render if data is null or API errors pulling data', () => {
        render(<RedlineMessage message={'Failed to fetch'} />);
        const RedlineElement = screen.queryByRole('heading');
        expect(RedlineElement).not.toBeInTheDocument();
    });

    it('should have a content prop with a test message', () => {
        render(<RedlineMessage message='test message' />);
        const testMessage = screen.getByText('test message');
        expect(testMessage).toBeInTheDocument();
    });

    it('should separate h2 element header from string', () => {
        render(<RedlineMessage message={message} />);
        const headerRemoved = screen.getByText('This is a link');
        expect(headerRemoved).toBeInTheDocument();
    });

    it('should render the Alert Box component', () => {
        render(<RedlineMessage content='test' message={message} />);
        const alertBox = screen.getByRole('heading');
        expect(alertBox).toHaveClass('alert-box__title');
    });
});
